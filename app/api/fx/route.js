export async function GET() {
  try {
    const res = await fetch('https://open.er-api.com/v6/latest/AUD', {
      next: { revalidate: 3600 }
    })
    if (!res.ok) throw new Error('FX fetch failed')
    const data = await res.json()
    const rates = data.rates
    return Response.json({
      USD: parseFloat((1 / rates.USD).toFixed(4)),
      GBP: parseFloat((1 / rates.GBP).toFixed(4)),
      EUR: parseFloat((1 / rates.EUR).toFixed(4)),
      updated: data.time_last_update_utc
    })
  } catch (err) {
    return Response.json({ USD: 1.58, GBP: 2.00, EUR: 1.72, updated: null, error: err.message })
  }
}
