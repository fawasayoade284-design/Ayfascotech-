"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Message {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function MessagesAdminPage() {
  const supabase = createClient();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("messages").select("*").order("created_at", { ascending: false });
    setMessages(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function markRead(id: string) {
    await supabase.from("messages").update({ is_read: true }).eq("id", id);
    load();
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    await supabase.from("messages").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl mb-2">Messages</h1>
      <p className="text-ink-dim text-sm mb-8">Inquiries submitted through your contact form.</p>

      {loading && <p className="text-ink-dim text-sm">Loading...</p>}
      {!loading && messages.length === 0 && <p className="text-ink-dim text-sm">No messages yet.</p>}

      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className={`glass-card p-6 ${!m.is_read ? "border-cyan" : ""}`}>
            <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
              <div>
                <b className="text-sm">{m.name}</b>
                <span className="text-ink-dim text-xs ml-2">{m.email}</span>
                {m.phone && <span className="text-ink-dim text-xs ml-2">· {m.phone}</span>}
              </div>
              <span className="text-xs text-ink-dim">{new Date(m.created_at).toLocaleString()}</span>
            </div>
            <p className="text-sm text-ink-dim leading-relaxed mb-4">{m.message}</p>
            <div className="flex gap-4 text-xs">
              {!m.is_read && (
                <button onClick={() => markRead(m.id)} className="text-cyan">Mark as read</button>
              )}
              <button onClick={() => remove(m.id)} className="text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
