-- Run this in your Supabase SQL editor
-- Go to: Supabase Dashboard > SQL Editor > New Query > paste this > Run

create table if not exists tours (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  artist_name text,
  status text default 'IN CONSIDERATION',
  payload jsonb,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Allow all operations (you're the only user)
alter table tours enable row level security;

create policy "Allow all" on tours for all using (true) with check (true);
