"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";

interface Hero {
  headline: string;
  subheading: string;
}
interface Social {
  whatsapp: string;
  email: string;
  phone: string;
}
interface Seo {
  site_title: string;
  site_description: string;
  og_image_url: string;
}

export default function SettingsAdminPage() {
  const supabase = createClient();
  const [hero, setHero] = useState<Hero>({ headline: "", subheading: "" });
  const [social, setSocial] = useState<Social>({ whatsapp: "", email: "", phone: "" });
  const [seo, setSeo] = useState<Seo>({ site_title: "", site_description: "", og_image_url: "" });
  const [loading, setLoading] = useState(true);
  const [savedKey, setSavedKey] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const { data } = await supabase.from("site_settings").select("*");
      const map = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));
      if (map.hero) setHero(map.hero);
      if (map.social_links) setSocial(map.social_links);
      if (map.seo) setSeo(map.seo);
      setLoading(false);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function save(key: string, value: any) {
    setError(null);
    const { error } = await supabase.from("site_settings").upsert({ key, value, updated_at: new Date().toISOString() });
    if (error) {
      setError(error.message);
      return;
    }
    setSavedKey(key);
    setTimeout(() => setSavedKey((k) => (k === key ? null : k)), 2000);
  }

  if (loading) return <p className="text-ink-dim text-sm">Loading...</p>;

  return (
    <div>
      <h1 className="font-display text-2xl mb-2">Site Settings</h1>
      <p className="text-ink-dim text-sm mb-10">
        Edit the copy, contact links, and SEO metadata visitors see — changes go live immediately, no deploy needed.
      </p>

      {error && <p className="text-red-400 text-sm mb-6">{error}</p>}

      {/* HERO */}
      <div className="glass-card p-7 mb-6">
        <h2 className="font-display text-lg mb-4">Homepage Hero</h2>
        <label className="text-xs text-ink-dim block mb-1">Headline</label>
        <textarea
          rows={2}
          value={hero.headline}
          onChange={(e) => setHero({ ...hero, headline: e.target.value })}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan mb-4"
        />
        <label className="text-xs text-ink-dim block mb-1">Subheading</label>
        <textarea
          rows={3}
          value={hero.subheading}
          onChange={(e) => setHero({ ...hero, subheading: e.target.value })}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan mb-4"
        />
        <button onClick={() => save("hero", hero)} className="btn-primary text-sm">
          {savedKey === "hero" ? "Saved ✓" : "Save Hero"}
        </button>
      </div>

      {/* SOCIAL / CONTACT LINKS */}
      <div className="glass-card p-7 mb-6">
        <h2 className="font-display text-lg mb-4">Contact Links</h2>
        <label className="text-xs text-ink-dim block mb-1">WhatsApp link</label>
        <input
          value={social.whatsapp}
          onChange={(e) => setSocial({ ...social, whatsapp: e.target.value })}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan mb-4"
        />
        <label className="text-xs text-ink-dim block mb-1">Email</label>
        <input
          value={social.email}
          onChange={(e) => setSocial({ ...social, email: e.target.value })}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan mb-4"
        />
        <label className="text-xs text-ink-dim block mb-1">Phone</label>
        <input
          value={social.phone}
          onChange={(e) => setSocial({ ...social, phone: e.target.value })}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan mb-4"
        />
        <button onClick={() => save("social_links", social)} className="btn-primary text-sm">
          {savedKey === "social_links" ? "Saved ✓" : "Save Contact Links"}
        </button>
      </div>

      {/* SEO */}
      <div className="glass-card p-7">
        <h2 className="font-display text-lg mb-4">SEO &amp; Metadata</h2>
        <label className="text-xs text-ink-dim block mb-1">Site title (browser tab, search results)</label>
        <input
          value={seo.site_title}
          onChange={(e) => setSeo({ ...seo, site_title: e.target.value })}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan mb-4"
        />
        <label className="text-xs text-ink-dim block mb-1">Site description (search results, social previews)</label>
        <textarea
          rows={3}
          value={seo.site_description}
          onChange={(e) => setSeo({ ...seo, site_description: e.target.value })}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan mb-4"
        />
        <label className="text-xs text-ink-dim block mb-1">Social share image</label>
        <ImageUpload value={seo.og_image_url} onChange={(url) => setSeo({ ...seo, og_image_url: url })} />
        <button onClick={() => save("seo", seo)} className="btn-primary text-sm mt-4">
          {savedKey === "seo" ? "Saved ✓" : "Save SEO Settings"}
        </button>
      </div>
    </div>
  );
}
