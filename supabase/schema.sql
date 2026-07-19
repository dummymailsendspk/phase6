-- ============================================================
-- Birthday Wish Portal — Database Schema
-- Run this whole file in: Supabase Dashboard -> SQL Editor -> New Query
-- ============================================================

-- 1. Table to store each friend's wish
create table if not exists public.wishes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  relationship text not null,
  message text not null,
  profile_pic_url text,
  photo_url text,
  video_url text,
  audio_url text,
  created_at timestamptz not null default now()
);

-- 2. Lock the table down with Row Level Security
alter table public.wishes enable row level security;

-- 3. Anyone (including anonymous visitors) can SUBMIT a wish...
create policy "Anyone can insert a wish"
  on public.wishes
  for insert
  to anon
  with check (true);

-- 4. ...but NO ONE can read the wishes table directly from the browser.
--    (No select policy = all direct reads are denied for the anon key.)
--    This satisfies "a friend shouldn't see other people's submissions."
--    Reading happens only through the get_all_wishes() function below,
--    which requires the correct dashboard passphrase — this is what
--    powers the birthday girl's "Secret Birthday Dashboard" later.

-- 5. Passphrase-gated read function for the secret dashboard (Phase 4)
--    Change 'change-me' to your own secret before running this file.
create or replace function public.get_all_wishes(passphrase text)
returns setof public.wishes
language plpgsql
security definer
set search_path = public
as $$
begin
  if passphrase <> 'change-me' then
    raise exception 'Invalid passphrase';
  end if;
  return query select * from public.wishes order by created_at desc;
end;
$$;

-- ============================================================
-- STORAGE (do this part in the dashboard UI, not SQL):
-- 1. Go to Storage -> Create a new bucket named:  wish-media
-- 2. Make it a PUBLIC bucket (so uploaded photos/videos/audio can be
--    displayed later without extra signed-URL logic).
-- 3. That's it — the app code uploads into this bucket automatically.
-- ============================================================
