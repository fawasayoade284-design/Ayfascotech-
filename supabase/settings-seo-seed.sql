-- =========================================================
-- AyfascoTech — SEO settings seed
-- Safe to run whether or not you've already run schema.sql —
-- it only inserts the 'seo' row if it doesn't already exist.
-- =========================================================

insert into site_settings (key, value) values
  ('seo', '{
     "site_title": "AyfascoTech — Full-Stack Developer & Web Designer",
     "site_description": "Ayoade Fawas Ayomide, founder of AyfascoTech, builds fast, beautiful, and scalable websites for businesses, startups, and personal brands worldwide.",
     "og_image_url": ""
   }')
on conflict (key) do nothing;
