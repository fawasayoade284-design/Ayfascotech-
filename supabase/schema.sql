-- =========================================================
-- AyfascoTech — Supabase schema
-- Run this once in the Supabase SQL editor (Project > SQL Editor > New query)
-- =========================================================

-- ---------- ADMIN PROFILES ----------
-- Extends auth.users with a role. The first row you insert here (matching
-- an auth user's id) becomes your admin account. See README for steps.
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

create policy "Admins can read their own profile"
  on profiles for select
  using (auth.uid() = id);

-- ---------- PROJECTS (portfolio) ----------
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  summary text,
  story text,
  challenges text,
  solutions text,
  results text,
  tech_stack text[] default '{}',
  cover_image_url text,
  live_url text,
  github_url text,
  featured boolean not null default false,
  published boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table projects enable row level security;

create policy "Public can read published projects"
  on projects for select
  using (published = true);

create policy "Admins can manage projects"
  on projects for all
  using (exists (select 1 from profiles where profiles.id = auth.uid()))
  with check (exists (select 1 from profiles where profiles.id = auth.uid()));

-- ---------- SERVICES ----------
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  icon text default '⚙️',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table services enable row level security;

create policy "Public can read published services"
  on services for select
  using (published = true);

create policy "Admins can manage services"
  on services for all
  using (exists (select 1 from profiles where profiles.id = auth.uid()))
  with check (exists (select 1 from profiles where profiles.id = auth.uid()));

-- ---------- TESTIMONIALS ----------
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_role text,
  company text,
  content text not null,
  rating int not null default 5 check (rating between 1 and 5),
  avatar_url text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table testimonials enable row level security;

create policy "Public can read published testimonials"
  on testimonials for select
  using (published = true);

create policy "Admins can manage testimonials"
  on testimonials for all
  using (exists (select 1 from profiles where profiles.id = auth.uid()))
  with check (exists (select 1 from profiles where profiles.id = auth.uid()));

-- ---------- PRICING PLANS ----------
create table if not exists pricing_plans (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price_label text not null,          -- e.g. "₦35,000" or "Custom Quote"
  features text[] default '{}',
  featured boolean not null default false,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table pricing_plans enable row level security;

create policy "Public can read published plans"
  on pricing_plans for select
  using (published = true);

create policy "Admins can manage plans"
  on pricing_plans for all
  using (exists (select 1 from profiles where profiles.id = auth.uid()))
  with check (exists (select 1 from profiles where profiles.id = auth.uid()));

-- ---------- BLOG ----------
create table if not exists blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  slug text unique not null
);

alter table blog_categories enable row level security;
create policy "Public can read categories" on blog_categories for select using (true);
create policy "Admins can manage categories" on blog_categories for all
  using (exists (select 1 from profiles where profiles.id = auth.uid()))
  with check (exists (select 1 from profiles where profiles.id = auth.uid()));

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content_markdown text,
  cover_image_url text,
  category_id uuid references blog_categories(id) on delete set null,
  tags text[] default '{}',
  read_minutes int default 4,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

alter table blog_posts enable row level security;

create policy "Public can read published posts"
  on blog_posts for select
  using (published = true);

create policy "Admins can manage posts"
  on blog_posts for all
  using (exists (select 1 from profiles where profiles.id = auth.uid()))
  with check (exists (select 1 from profiles where profiles.id = auth.uid()));

-- ---------- CONTACT MESSAGES ----------
create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  project_type text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table messages enable row level security;

-- Anyone (including anonymous visitors) can submit the contact form...
create policy "Anyone can submit a message"
  on messages for insert
  with check (true);

-- ...but only admins can read, update (mark read), or delete messages.
create policy "Admins can read messages"
  on messages for select
  using (exists (select 1 from profiles where profiles.id = auth.uid()));

create policy "Admins can update messages"
  on messages for update
  using (exists (select 1 from profiles where profiles.id = auth.uid()));

create policy "Admins can delete messages"
  on messages for delete
  using (exists (select 1 from profiles where profiles.id = auth.uid()));

-- ---------- SITE SETTINGS (homepage copy, SEO, social links) ----------
create table if not exists site_settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);

alter table site_settings enable row level security;

create policy "Public can read settings"
  on site_settings for select
  using (true);

create policy "Admins can manage settings"
  on site_settings for all
  using (exists (select 1 from profiles where profiles.id = auth.uid()))
  with check (exists (select 1 from profiles where profiles.id = auth.uid()));

-- ---------- SEED DATA ----------
insert into services (title, description, icon, sort_order) values
  ('Full-Stack Development', 'Custom web applications and dashboards built on modern, scalable architecture.', '⚙️', 1),
  ('Business Websites', 'Professional sites that build trust and turn visitors into customers.', '🏢', 2),
  ('Portfolio Websites', 'Personal brand sites for creators, photographers, and professionals.', '🧑‍💻', 3),
  ('Landing Pages', 'High-converting single pages for launches, campaigns, and offers.', '🚀', 4),
  ('E-commerce Development', 'Online stores with secure checkout and inventory management.', '🛒', 5),
  ('Website Maintenance', 'Ongoing updates, monitoring, and fixes so your site keeps running smoothly.', '🛠️', 6)
on conflict do nothing;

insert into pricing_plans (name, price_label, features, featured, sort_order) values
  ('Starter', '₦15,000', array['Single-page website','Mobile responsive','Basic SEO setup','1 revision round'], false, 1),
  ('Professional', '₦35,000', array['Up to 5-page website','Custom design','SEO + speed optimization','Contact form integration','3 revision rounds'], true, 2),
  ('Premium', '₦70,000', array['Full custom web app','Database integration','Admin dashboard','Priority support'], false, 3),
  ('Enterprise', 'Custom Quote', array['Complex platforms','Ongoing maintenance','Dedicated support','Scalable architecture'], false, 4)
on conflict do nothing;

insert into site_settings (key, value) values
  ('hero', '{"headline": "Building fast, beautiful & scalable websites that help businesses grow.", "subheading": "I design and develop premium websites and web applications that combine speed, modern design, security, and outstanding user experience."}'),
  ('social_links', '{"whatsapp": "https://wa.me/2348071457944", "email": "fawasayoade284@gmail.com", "phone": "09126347822"}'),
  ('seo', '{"site_title": "AyfascoTech — Full-Stack Developer & Web Designer", "site_description": "Ayoade Fawas Ayomide, founder of AyfascoTech, builds fast, beautiful, and scalable websites for businesses, startups, and personal brands worldwide.", "og_image_url": ""}')
on conflict (key) do nothing;
