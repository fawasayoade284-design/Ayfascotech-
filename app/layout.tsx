import type { Metadata } from "next";
import "./globals.css";
import { createClient } from "@/lib/supabase/server";

// SEO title/description/social image are editable in /admin/settings —
// this reads whatever's currently saved in Supabase on every request,
// falling back to sensible defaults if the settings row hasn't been set yet.
export async function generateMetadata(): Promise<Metadata> {
  const supabase = createClient();
  const { data } = await supabase.from("site_settings").select("value").eq("key", "seo").single();

  const seo = data?.value ?? {
    site_title: "AyfascoTech — Full-Stack Developer & Web Designer",
    site_description:
      "Ayoade Fawas Ayomide, founder of AyfascoTech, builds fast, beautiful, and scalable websites for businesses, startups, and personal brands worldwide.",
    og_image_url: "",
  };

  return {
    title: seo.site_title,
    description: seo.site_description,
    metadataBase: new URL("https://ayfascotech.com"),
    openGraph: {
      title: seo.site_title,
      description: seo.site_description,
      type: "website",
      images: seo.og_image_url ? [seo.og_image_url] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.site_title,
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy text-ink font-body antialiased">
        {children}
      </body>
    </html>
  );
}
