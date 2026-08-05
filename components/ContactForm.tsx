"use client";

import { useState } from "react";

export default function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const body = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setStatus("sent");
      form.reset();
    } else {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="glass-card p-6 text-sm">
        Thanks — your message has been sent. I'll reply within 24 hours.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        required
        placeholder="Your name"
        className="bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan"
      />
      <input
        name="email"
        type="email"
        required
        placeholder="Your email"
        className="bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan"
      />
      <textarea
        name="message"
        required
        placeholder="Tell me about your project..."
        rows={4}
        className="bg-white/[0.02] border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-cyan resize-y"
      />
      <button type="submit" disabled={status === "sending"} className="btn-primary justify-center">
        {status === "sending" ? "Sending..." : "Send Message →"}
      </button>
      {status === "error" && (
        <p className="text-red-400 text-xs">Something went wrong — please try again or reach out on WhatsApp.</p>
      )}
    </form>
  );
}
