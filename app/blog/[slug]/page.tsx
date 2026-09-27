import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { createClient } from "@/lib/supabase/server";
import type { Metadata } from "next";

export const revalidate = 60;

async function getPost(slug: string) {
  const supabase = await createClient();
  const { data } = await supabase
    .from("blog_posts")
    .select("*, blog_categories(name, slug)")
    .eq("slug", slug)
    .eq("published", true)
    .single();
  return data;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const post = await getPost((await params).slug);
  if (!post) return {};
  return {
    title: `${post.title} — AyfascoTech Blog`,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, images: post.cover_image_url ? [post.cover_image_url] : [] },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) notFound();

  const supabase = await createClient();
  const { data: related } = await supabase
    .from("blog_posts")
    .select("title, slug, excerpt")
    .eq("published", true)
    .neq("id", post.id)
    .eq("category_id", post.category_id)
    .limit(3);

  return (
    <div className="min-h-screen px-[6vw] py-24 max-w-3xl mx-auto">
      <Link href="/blog" className="text-ink-dim text-sm hover:text-cyan">← All posts</Link>

      {post.blog_categories?.name && (
        <span className="block text-xs font-mono text-cyan mt-6">{post.blog_categories.name}</span>
      )}
      <h1 className="font-display text-3xl md:text-4xl mt-3 mb-4">{post.title}</h1>
      <div className="flex gap-4 text-xs text-ink-dim mb-10">
        <span>{post.read_minutes ?? 4} min read</span>
        {(post.tags ?? []).length > 0 && <span>{post.tags.join(" · ")}</span>}
      </div>

      {post.cover_image_url && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.cover_image_url} alt={post.title} className="w-full rounded-xl mb-10 border border-white/10" />
      )}

      <article className="prose prose-invert prose-p:text-ink-dim prose-headings:font-display max-w-none">
        <ReactMarkdown>{post.content_markdown ?? ""}</ReactMarkdown>
      </article>

      {related && related.length > 0 && (
        <div className="mt-16 pt-10 border-t border-white/5">
          <h2 className="text-lg mb-6">Related posts</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {related.map((r) => (
              <Link key={r.slug} href={`/blog/${r.slug}`} className="glass-card p-5 block hover:border-cyan transition-colors">
                <b className="text-sm block mb-1">{r.title}</b>
                <span className="text-xs text-ink-dim">{r.excerpt}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
