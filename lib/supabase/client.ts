import { createBrowserClient } from "@supabase/ssr";

// Used inside Client Components ("use client"). Reads the public,
// safe-to-expose anon key — never the service role key.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
