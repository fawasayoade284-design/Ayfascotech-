"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface Props {
  value: string;
  onChange: (url: string) => void;
}

// Drop-in replacement for a plain "image URL" text field. Lets the admin
// either paste a URL directly or upload a file, which is stored in the
// public "media" Storage bucket (see supabase/storage.sql) and swapped
// in as the field's value automatically.
export default function ImageUpload({ value, onChange }: Props) {
  const supabase = createClient();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage.from("media").upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

    if (uploadError) {
      setError(uploadError.message);
      setUploading(false);
      return;
    }

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    onChange(data.publicUrl);
    setUploading(false);
  }

  return (
    <div>
      {value && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={value} alt="" className="w-full h-32 object-cover rounded-lg mb-2 border border-white/10" />
      )}
      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Image URL"
          value={value ?? ""}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1 bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan"
        />
        <label className="btn-ghost !py-2 !px-4 text-xs cursor-pointer whitespace-nowrap">
          {uploading ? "Uploading..." : "Upload"}
          <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="hidden" />
        </label>
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
}
