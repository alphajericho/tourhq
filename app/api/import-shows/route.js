export async function POST(request) {
  try {
    const { text, knownVenues, knownCities } = await request.json()

    if (!text) return Response.json({ error: 'No text provided' }, { status: 400 })

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })

    const system = `You are a touring industry data parser for an Australian concert promoter. Extract show information from the user's text and return ONLY valid JSON, no markdown, no explanation.

Known venues database: ${JSON.stringify(knownVenues || [])}
Known cities: ${(knownCities || []).join(", ")}

Return a JSON array of show objects. Each object must have these exact keys:
- city: string (city name — always use the city provided, expand abbreviations: "Coffs Hbr" = "Coffs Harbour", "Melb" = "Melbourne", "Syd" = "Sydney", "Bris" = "Brisbane", "Adel" = "Adelaide" etc)
- venueName: string (ALWAYS use the venue name from the input, even if not in the database. NEVER use "TBC" unless the input literally says "TBC". Match to known venues where possible for data lookup, but always write the actual venue name.)
- cap: number (capacity — use known venue data if name matches, else 0)
- ticketPrice: number (gross ticket price AUD, use 0 if not mentioned)
- flatHire: number (flat venue hire — use known venue data if matched, else 0)
- perHead: number (per head fee — use known venue data if matched, else 5.5)
- attendPct: number (forecast attendance as decimal e.g. 0.7, default 0.6)
- notes: string (any extra info such as all ages, 18+ etc. Empty string if none)
- isNewVenue: boolean (true if venue name not found in known venues database)
- isNewCity: boolean (true if city not in known cities list)

CRITICAL: Never use "TBC" for venueName. If a venue is given in the input, always use that name.
Match venues intelligently — "Mo's Desert Club House" matches "Mo's Desert Clubhouse" etc.
Return ONLY the JSON array, nothing else.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        system,
        messages: [{ role: 'user', content: text }],
      }),
    })

    const data = await response.json()
    let raw = ''
    for (const block of data.content || []) {
      if (block.type === 'text') raw += block.text
    }

    const cleaned = raw.trim().replace(/```json|```/g, '').trim()
    const start = cleaned.indexOf('[')
    const end = cleaned.lastIndexOf(']')
    if (start === -1 || end === -1) throw new Error('No array in response')

    const parsed = JSON.parse(cleaned.slice(start, end + 1))
    return Response.json({ shows: parsed })

  } catch (err) {
    console.error('Import shows error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
