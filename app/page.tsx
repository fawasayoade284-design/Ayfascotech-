import { createClient } from "@/lib/supabase/server";
import ContactForm from "@/components/ContactForm";

export const revalidate = 60; // re-fetch content from Supabase every 60s

export default async function HomePage() {
  const supabase = createClient();

  const [{ data: services }, { data: projects }, { data: testimonials }, { data: plans }, { data: settingsRows }] =
    await Promise.all([
      supabase.from("services").select("*").eq("published", true).order("sort_order"),
      supabase.from("projects").select("*").eq("published", true).order("sort_order"),
      supabase.from("testimonials").select("*").eq("published", true).order("created_at", { ascending: false }),
      supabase.from("pricing_plans").select("*").eq("published", true).order("sort_order"),
      supabase.from("site_settings").select("*"),
    ]);

  const settings = Object.fromEntries((settingsRows ?? []).map((r) => [r.key, r.value])) as Record<string, any>;
  const hero = settings.hero ?? {
    headline: "Building fast, beautiful & scalable websites that help businesses grow.",
    subheading: "I design and develop premium websites and web applications for businesses worldwide.",
  };
  const social = settings.social_links ?? { whatsapp: "#", email: "", phone: "" };

  return (
    <>
      <div className="fixed inset-0 bg-grid pointer-events-none z-0" />

      {/* NAV */}
      <nav className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-[6vw] py-4 bg-navy/60 backdrop-blur-lg border-b border-white/5">
        <span className="font-display font-bold text-lg">
          Ayfasco<span className="text-cyan">Tech</span>
        </span>
        <div className="hidden md:flex gap-8 text-sm text-ink-dim">
          <a href="#services" className="hover:text-ink">Services</a>
          <a href="#work" className="hover:text-ink">Work</a>
          <a href="#pricing" className="hover:text-ink">Pricing</a>
          <a href="/blog" className="hover:text-ink">Blog</a>
          <a href="#contact" className="hover:text-ink">Contact</a>
        </div>
        <a href="#contact" className="btn-primary !py-2 !px-5 text-xs">Book a Call</a>
      </nav>

      {/* HERO */}
      <section className="relative z-10 min-h-screen flex items-center px-[6vw] pt-32 pb-20">
        <div className="max-w-2xl">
          <div className="pill inline-block text-emerald mb-6">AVAILABLE WORLDWIDE · REMOTE</div>
          <h1 className="text-4xl md:text-6xl leading-tight mb-6">{hero.headline}</h1>
          <p className="text-ink-dim text-lg leading-relaxed mb-10 max-w-xl">{hero.subheading}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="btn-primary">Hire Me →</a>
            <a href="#work" className="btn-ghost">View Portfolio</a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="relative z-10 px-[6vw] py-24">
        <h2 className="text-3xl mb-12">Everything your business needs to live online.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(services ?? []).map((s) => (
            <div key={s.id} className="glass-card p-7">
              <div className="text-2xl mb-4">{s.icon}</div>
              <h3 className="text-lg mb-2">{s.title}</h3>
              <p className="text-sm text-ink-dim leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* PORTFOLIO */}
      <section id="work" className="relative z-10 px-[6vw] py-24">
        <h2 className="text-3xl mb-12">Featured Work</h2>
        <div className="space-y-8">
          {(projects ?? []).map((p) => (
            <div key={p.id} className="glass-card p-8 md:p-10 flex flex-col md:flex-row gap-8">
              {p.cover_image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.cover_image_url}
                  alt={p.title}
                  className="w-full md:w-2/5 rounded-xl object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-2xl mb-3">{p.title}</h3>
                <p className="text-ink-dim text-sm leading-relaxed mb-4">{p.summary}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(p.tech_stack ?? []).map((t: string) => (
                    <span key={t} className="text-xs font-mono px-3 py-1 rounded-full bg-cyan/10 border border-cyan/25 text-cyan">
                      {t}
                    </span>
                  ))}
                </div>
                {p.live_url && (
                  <a href={p.live_url} target="_blank" className="btn-primary inline-block">
                    View Live Demo →
                  </a>
                )}
              </div>
            </div>
          ))}
          {(!projects || projects.length === 0) && (
            <p className="text-ink-dim text-sm">Projects added in the admin dashboard will appear here.</p>
          )}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative z-10 px-[6vw] py-24">
        <h2 className="text-3xl mb-12">What Clients Say</h2>
        <div className="flex gap-5 overflow-x-auto pb-4">
          {(testimonials ?? []).map((t) => (
            <div key={t.id} className="glass-card p-6 min-w-[300px]">
              <div className="text-amber-400 text-sm mb-3">{"★".repeat(t.rating)}</div>
              <p className="text-sm text-ink-dim leading-relaxed mb-5">"{t.content}"</p>
              <b className="text-sm block">{t.client_name}</b>
              <span className="text-xs text-ink-dim">{t.client_role} {t.company && `· ${t.company}`}</span>
            </div>
          ))}
        </div>
      </section>

      {/* PRICING */}
      <section id="pricing" className="relative z-10 px-[6vw] py-24">
        <h2 className="text-3xl mb-12">Simple, transparent packages.</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(plans ?? []).map((plan) => (
            <div
              key={plan.id}
              className={`glass-card p-7 flex flex-col ${plan.featured ? "border-cyan" : ""}`}
            >
              <h3 className="text-xs uppercase tracking-wider text-ink-dim mb-3">{plan.name}</h3>
              <div className="font-display text-2xl mb-6">{plan.price_label}</div>
              <ul className="text-sm text-ink-dim space-y-2 mb-8 flex-1">
                {(plan.features ?? []).map((f: string) => (
                  <li key={f}>✓ {f}</li>
                ))}
              </ul>
              <a href="#contact" className={plan.featured ? "btn-primary text-center" : "btn-ghost text-center"}>
                Get Started
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative z-10 px-[6vw] py-24">
        <h2 className="text-3xl mb-12">Let's build something great together.</h2>
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-4 text-sm">
            <p><b>Email:</b> <span className="text-ink-dim">{social.email}</span></p>
            <p><b>Phone:</b> <span className="text-ink-dim">{social.phone}</span></p>
            <p><b>WhatsApp:</b> <a href={social.whatsapp} className="text-cyan">Chat now</a></p>
          </div>
          <div className="flex-1">
            <ContactForm />
          </div>
        </div>
      </section>

      <footer className="relative z-10 px-[6vw] py-10 border-t border-white/5 text-xs text-ink-dim flex justify-between flex-wrap gap-4">
        <span>© {new Date().getFullYear()} AyfascoTech · Ayoade Fawas Ayomide.</span>
      </footer>

      {social.whatsapp && (
        <a
          href={social.whatsapp}
          target="_blank"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#25D366] to-emerald flex items-center justify-center shadow-lg"
        >
          <span className="text-white text-2xl">💬</span>
        </a>
      )}
    </>
  );
}
