import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const { data, error } = await supabase
      .from('tours')
      .select('*')
      .eq('id', id)
      .single()
    if (error) return Response.json({ error: error.message }, { status: 500 })
    return Response.json({ tour: data })
  }

  const { data, error } = await supabase
    .from('tours')
    .select('id, name, artist_name, status, updated_at')
    .order('updated_at', { ascending: false })

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ tours: data })
}

export async function POST(request) {
  const body = await request.json()
  const { name, artist_name, status, payload } = body

  const { data, error } = await supabase
    .from('tours')
    .insert([{ name, artist_name, status, payload }])
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ tour: data })
}

export async function PUT(request) {
  const body = await request.json()
  const { id, name, artist_name, status, payload } = body

  const { data, error } = await supabase
    .from('tours')
    .update({ name, artist_name, status, payload, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single()

  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ tour: data })
}

export async function DELETE(request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  const { error } = await supabase.from('tours').delete().eq('id', id)
  if (error) return Response.json({ error: error.message }, { status: 500 })
  return Response.json({ success: true })
}
