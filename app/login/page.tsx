"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-navy px-6">
      <form onSubmit={handleSubmit} className="glass-card p-8 w-full max-w-sm">
        <h1 className="font-display text-xl mb-1">AyfascoTech Admin</h1>
        <p className="text-ink-dim text-sm mb-6">Sign in to manage your site.</p>

        <label className="text-xs text-ink-dim block mb-1">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan mb-4"
        />

        <label className="text-xs text-ink-dim block mb-1">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan mb-6"
        />

        {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
}
