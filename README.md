# Tour HQ — Deployment Guide

## Step 1 — Supabase database setup
1. Go to supabase.com → your project → SQL Editor
2. Click New Query
3. Copy and paste the contents of `supabase-setup.sql`
4. Click Run

## Step 2 — Get your Supabase keys
1. In Supabase → Settings → API
2. Copy: Project URL, anon public key, service_role key

## Step 3 — Get your Anthropic API key
1. Go to console.anthropic.com
2. API Keys → Create Key
3. Copy it (you only see it once)

## Step 4 — Push to GitHub
1. Go to github.com → New Repository → name it "tourhq" → Create
2. Follow the instructions to push existing code

## Step 5 — Deploy on Vercel
1. Go to vercel.com → Add New Project
2. Import your tourhq GitHub repository
3. In Environment Variables, add:
   - ANTHROPIC_API_KEY
   - NEXT_PUBLIC_SUPABASE_URL
   - NEXT_PUBLIC_SUPABASE_ANON_KEY
   - SUPABASE_SERVICE_ROLE_KEY
4. Click Deploy

That's it. You'll get a live URL.
