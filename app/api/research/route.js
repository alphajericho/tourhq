export async function POST(request) {
  try {
    const { artistName } = await request.json()

    if (!artistName) {
      return Response.json({ error: 'No artist name provided' }, { status: 400 })
    }

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      return Response.json({ error: 'ANTHROPIC_API_KEY not configured' }, { status: 500 })
    }

    const PROMPT = `You are a music industry research assistant helping an Australian concert promoter.
Research the artist/band: "${artistName}"

Return ONLY a valid JSON object with NO markdown, no backticks, no explanation. Just raw JSON.

The JSON must have these exact keys:
{
  "agent": "booking agent name if findable, else ''",
  "genre": "genre",
  "fbTotal": "Facebook followers as number string e.g. '450000'",
  "igTotal": "Instagram followers as number string",
  "ytTotal": "YouTube subscribers as number string",
  "spotMonthly": "Spotify monthly listeners as number string",
  "tiktok": "TikTok followers as number string if available else ''",
  "prevTours": [
    { "city": "city", "venue": "venue name", "pax": "capacity as number string", "price": "ticket price AUD as number string", "year": "year", "promoter": "promoter name", "soldOut": "Yes/No/Unknown" }
  ],
  "overseaShows": [
    { "date": "month year", "venue": "venue", "city": "city, country", "size": "capacity as number", "price": "ticket price USD or local currency", "soldOut": "Yes/No/Unknown" }
  ],
  "competing": [
    { "artist": "similar artist touring australia", "month": "when", "promoter": "promoter", "price": "ticket price", "venueSize": "venue size" }
  ],
  "notes": "2-3 sentence career snapshot",
  "lastPromoter": "who promoted their most recent Australian tour",
  "soldOutFlag": "Did their last Australian tour sell out? Yes/No/Partial/Unknown"
}

For prevTours: find ALL Australian tours in the last 5 years.
For overseaShows: find current or most recent overseas tour dates. Focus on last 12 months.
Return only the JSON object, nothing else.`

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'web-search-2025-03-05',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: PROMPT }],
      }),
    })

    const responseText = await response.text()

    if (!response.ok) {
      console.error('Anthropic API error:', response.status, responseText)
      return Response.json({ error: `Anthropic API error ${response.status}: ${responseText.slice(0, 300)}` }, { status: 500 })
    }

    const data = JSON.parse(responseText)

    // Extract text blocks
    let raw = ''
    for (const block of data.content || []) {
      if (block.type === 'text' && block.text) raw += block.text
    }

    if (!raw) {
      return Response.json({ error: 'No text response from API' }, { status: 500 })
    }

    // Strip markdown fences
    let jsonStr = raw.trim().replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim()
    const start = jsonStr.indexOf('{')
    const end = jsonStr.lastIndexOf('}')
    if (start === -1 || end === -1) {
      return Response.json({ error: `Could not find JSON in response. Raw: ${raw.slice(0, 200)}` }, { status: 500 })
    }
    jsonStr = jsonStr.slice(start, end + 1)

    const parsed = JSON.parse(jsonStr)
    return Response.json({ data: parsed })

  } catch (err) {
    console.error('Research route error:', err)
    return Response.json({ error: err.message }, { status: 500 })
  }
}
