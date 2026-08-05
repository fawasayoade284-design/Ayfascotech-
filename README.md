# AyfascoTech — Next.js + Supabase

A content-managed portfolio site: public homepage pulls live from Supabase, and
`/admin` is a password-protected dashboard for managing projects, services,
testimonials, and contact messages — no code changes needed to update content.

## 1. Create your Supabase project

1. Go to [supabase.com](https://supabase.com) → New Project. Pick a region close to your clients.
2. Open **SQL Editor** → New query, run these three files in order:
   1. `supabase/schema.sql` — every table, security policy, and starting content (services, pricing, hero copy, SEO defaults).
   2. `supabase/storage.sql` — creates the public `media` bucket used for image uploads in the admin dashboard.
   3. `supabase/settings-seo-seed.sql` — only needed if you ran an older version of `schema.sql` that predates the SEO settings row; safe to run either way, it no-ops if the row already exists.
3. Go to **Settings → API** and copy:
   - Project URL
   - `anon` `public` key

## 2. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in the two values from step 1:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
```

## 3. Create your admin login

The dashboard checks two things: a valid Supabase Auth user, **and** a matching
row in the `profiles` table. Both are required.

1. In Supabase, go to **Authentication → Users → Add user** (or "Invite").
   Create a user with your email and a password.
2. Copy that user's **UID** (shown in the users list).
3. Back in **SQL Editor**, run:
   ```sql
   insert into profiles (id, full_name)
   values ('paste-the-uid-here', 'Ayoade Fawas Ayomide');
   ```
4. That email + password now logs into `/admin`.

You can repeat step 1–3 to add more admin users later.

## 4. Run it locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` for the public site and
`http://localhost:3000/login` to sign in to the dashboard.

## 5. Deploy to Vercel

1. Push this project to a GitHub repo.
2. In Vercel: **New Project** → import the repo.
3. Add the same two environment variables from `.env.local` in
   **Project Settings → Environment Variables**.
4. Deploy. Every push to your main branch redeploys automatically.

## What's included

- **Public site** (`app/page.tsx`) — hero, services, portfolio, testimonials,
  pricing, and a working contact form, all reading live from Supabase.
- **Blog** (`app/blog`, `app/blog/[slug]`) — public post list and detail
  pages with markdown rendering, tags, read time, and related posts by
  category. Only posts marked "Published" in the admin dashboard appear.
- **Admin dashboard** (`app/admin/*`) — protected by `middleware.ts`, which
  checks auth + the `profiles` table on every request to `/admin/*`.
  Sections: Projects, Services, Testimonials, Blog Posts, Blog Categories,
  Messages, and Site Settings.
- **Generic CRUD manager** (`components/admin/CrudManager.tsx`) — one
  component powers Projects, Services, Testimonials, and Blog; each admin
  page just passes a field list, including `relation` fields (e.g. a blog
  post's category, pulled from another table) and `image` fields (upload
  or paste a URL). Reuse this pattern for new content types.
- **Image uploads** (`components/admin/ImageUpload.tsx`) — uploads go to
  the public `media` Storage bucket and the resulting URL is saved on the
  record automatically. Used for project covers, testimonial avatars, blog
  covers, and the SEO social-share image.
- **Site Settings** (`app/admin/settings`) — edit the homepage hero copy,
  contact links, and SEO title/description/share-image without touching
  code or redeploying. The SEO fields feed directly into the site's
  `<title>` and meta tags via `generateMetadata` in `app/layout.tsx`.
- **Database schema** (`supabase/schema.sql`) — tables for projects, services,
  testimonials, pricing plans, blog posts/categories, messages, and
  site-wide settings, each with row-level security so visitors can only read
  published content and only admins can write.

## Extending it further

- **Rich text editor**: blog content is currently plain markdown in a
  textarea. Swap it for an editor like Tiptap or MDXEditor if you want a
  WYSIWYG experience — it just needs to keep producing markdown to save into
  `content_markdown`.
- **Analytics**: the schema doesn't include an analytics table yet. A simple
  approach: a `page_views` table plus a lightweight insert on each page
  load, summarized on the admin overview page.
- **Newsletter**: add a `subscribers` table (email, subscribed_at) with an
  insert-only RLS policy, and a signup form component similar to `ContactForm.tsx`.
