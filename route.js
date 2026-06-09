import { neon } from '@neondatabase/serverless'

const sql = neon(process.env.DATABASE_URL)

// Create table if it doesn't exist
async function ensureTable() {
  await sql`
    CREATE TABLE IF NOT EXISTS tours (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL DEFAULT 'New Tour',
      artist_name TEXT DEFAULT '',
      status TEXT DEFAULT 'IN CONSIDERATION',
      payload JSONB DEFAULT '{}',
      updated_at TIMESTAMPTZ DEFAULT NOW(),
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `
}

export async function GET(request) {
  try {
    await ensureTable()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (id) {
      const rows = await sql`SELECT * FROM tours WHERE id = ${id} LIMIT 1`
      if (!rows.length) return Response.json({ error: 'Not found' }, { status: 404 })
      return Response.json({ tour: rows[0] })
    }

    const rows = await sql`
      SELECT id, name, artist_name, status, updated_at
      FROM tours
      ORDER BY updated_at DESC
    `
    return Response.json({ tours: rows })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function POST(request) {
  try {
    await ensureTable()
    const { name, artist_name, status, payload } = await request.json()
    const rows = await sql`
      INSERT INTO tours (name, artist_name, status, payload)
      VALUES (${name}, ${artist_name}, ${status}, ${JSON.stringify(payload)})
      RETURNING *
    `
    return Response.json({ tour: rows[0] })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function PUT(request) {
  try {
    await ensureTable()
    const { id, name, artist_name, status, payload } = await request.json()
    const rows = await sql`
      UPDATE tours
      SET name = ${name},
          artist_name = ${artist_name},
          status = ${status},
          payload = ${JSON.stringify(payload)},
          updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `
    return Response.json({ tour: rows[0] })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}

export async function DELETE(request) {
  try {
    await ensureTable()
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    await sql`DELETE FROM tours WHERE id = ${id}`
    return Response.json({ success: true })
  } catch (e) {
    return Response.json({ error: e.message }, { status: 500 })
  }
}
