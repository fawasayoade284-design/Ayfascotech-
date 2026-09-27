import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const revalidate = 60;

export default async function BlogIndexPage() {
  const supabase = await createClient();
  const { data: posts } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(name)")
    .eq("published", true)
    .order("published_at", { ascending: false });

  return (
    <div className="min-h-screen px-[6vw] py-24 max-w-4xl mx-auto">
      <Link href="/" className="text-ink-dim text-sm hover:text-cyan">← Back home</Link>
      <h1 className="font-display text-3xl md:text-4xl mt-6 mb-12">From the AyfascoTech blog</h1>

      <div className="space-y-6">
        {(posts ?? []).map((p: any) => (
          <Link key={p.id} href={`/blog/${p.slug}`} className="glass-card p-6 block hover:border-cyan transition-colors">
            {p.blog_categories?.name && (
              <span className="text-xs font-mono text-cyan">{p.blog_categories.name}</span>
            )}
            <h2 className="text-xl mt-2 mb-2">{p.title}</h2>
            <p className="text-sm text-ink-dim leading-relaxed mb-3">{p.excerpt}</p>
            <span className="text-xs text-ink-dim">{p.read_minutes ?? 4} min read</span>
          </Link>
        ))}
        {(!posts || posts.length === 0) && (
          <p className="text-ink-dim text-sm">No posts published yet — check back soon.</p>
        )}
      </div>
    </div>
  );
}
