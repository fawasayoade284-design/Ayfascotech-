-- =========================================================
-- AyfascoTech — Storage setup for image uploads
-- Run this in the Supabase SQL editor AFTER schema.sql.
-- Creates a public "media" bucket for project covers, testimonial
-- avatars, and blog cover images, uploaded from the admin dashboard.
-- =========================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

-- Anyone can view files (needed so images render on the public site).
create policy "Public can view media"
  on storage.objects for select
  using (bucket_id = 'media');

-- Only signed-in admins can upload, replace, or remove files.
create policy "Admins can upload media"
  on storage.objects for insert
  with check (
    bucket_id = 'media'
    and exists (select 1 from profiles where profiles.id = auth.uid())
  );

create policy "Admins can update media"
  on storage.objects for update
  using (
    bucket_id = 'media'
    and exists (select 1 from profiles where profiles.id = auth.uid())
  );

create policy "Admins can delete media"
  on storage.objects for delete
  using (
    bucket_id = 'media'
    and exists (select 1 from profiles where profiles.id = auth.uid())
  );
