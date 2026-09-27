import { createClient } from "@/lib/supabase/server";

export default async function AdminOverview() {
  const supabase = await createClient();

  const [{ count: projects }, { count: services }, { count: testimonials }, { count: unread }] = await Promise.all([
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("services").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("messages").select("*", { count: "exact", head: true }).eq("is_read", false),
  ]);

  const cards = [
    { label: "Projects", value: projects ?? 0 },
    { label: "Services", value: services ?? 0 },
    { label: "Testimonials", value: testimonials ?? 0 },
    { label: "Unread Messages", value: unread ?? 0 },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl mb-2">Welcome back</h1>
      <p className="text-ink-dim text-sm mb-10">Here's what's happening on your site.</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {cards.map((c) => (
          <div key={c.label} className="glass-card p-6">
            <div className="font-display text-3xl mb-1">{c.value}</div>
            <div className="text-xs text-ink-dim">{c.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
