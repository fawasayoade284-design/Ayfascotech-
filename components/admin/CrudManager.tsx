"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ImageUpload from "@/components/admin/ImageUpload";

export type FieldType = "text" | "textarea" | "number" | "boolean" | "tags" | "url" | "image" | "relation";

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  required?: boolean;
  // shown as a column in the list table; defaults to true for text/number fields
  showInList?: boolean;
  // for type "relation": which table/column to pull options from
  relationTable?: string;
  relationLabelKey?: string; // column shown to the admin, e.g. "name"
}

interface Props {
  table: string;
  title: string;
  description?: string;
  fields: FieldDef[];
  orderBy?: string;
}

type Row = Record<string, any>;

// A single component that drives create / read / update / delete for any
// table in this schema. Pass it a list of field definitions and it renders
// a data table plus a modal form — used identically for Projects, Services,
// and Testimonials so new content types only need a field list, not new UI.
export default function CrudManager({ table, title, description, fields, orderBy = "created_at" }: Props) {
  const supabase = createClient();
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Row | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [relationOptions, setRelationOptions] = useState<Record<string, { id: string; label: string }[]>>({});

  useEffect(() => {
    const relationFields = fields.filter((f) => f.type === "relation" && f.relationTable);
    relationFields.forEach(async (f) => {
      const { data } = await supabase.from(f.relationTable!).select(`id, ${f.relationLabelKey ?? "name"}`);
      setRelationOptions((prev) => ({
        ...prev,
        [f.key]: (data ?? []).map((r: any) => ({ id: r.id, label: r[f.relationLabelKey ?? "name"] })),
      }));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  function relationLabel(fieldKey: string, id: string) {
    const opts = relationOptions[fieldKey] ?? [];
    return opts.find((o) => o.id === id)?.label ?? "—";
  }

  async function load() {
    setLoading(true);
    const { data, error } = await supabase.from(table).select("*").order(orderBy, { ascending: false });
    if (error) setError(error.message);
    setRows(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table]);

  function openCreate() {
    const blank: Row = {};
    fields.forEach((f) => {
      blank[f.key] = f.type === "boolean" ? false : f.type === "tags" ? [] : "";
    });
    setEditing(blank);
    setShowForm(true);
  }

  function openEdit(row: Row) {
    setEditing({ ...row });
    setShowForm(true);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this item? This can't be undone.")) return;
    const { error } = await supabase.from(table).delete().eq("id", id);
    if (error) {
      setError(error.message);
      return;
    }
    load();
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError(null);

    const payload = { ...editing };
    const isNew = !payload.id;
    if (isNew) delete payload.id;

    const { error } = isNew
      ? await supabase.from(table).insert(payload)
      : await supabase.from(table).update(payload).eq("id", payload.id);

    setSaving(false);

    if (error) {
      setError(error.message);
      return;
    }

    setShowForm(false);
    setEditing(null);
    load();
  }

  const listFields = fields.filter((f) => f.showInList !== false).slice(0, 4);

  return (
    <div>
      <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="font-display text-2xl">{title}</h1>
          {description && <p className="text-ink-dim text-sm mt-1">{description}</p>}
        </div>
        <button onClick={openCreate} className="btn-primary text-sm">
          + Add New
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      <div className="glass-card overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-dim border-b border-white/10">
              {listFields.map((f) => (
                <th key={f.key} className="p-4 font-medium">{f.label}</th>
              ))}
              <th className="p-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr><td className="p-4 text-ink-dim" colSpan={listFields.length + 1}>Loading...</td></tr>
            )}
            {!loading && rows.length === 0 && (
              <tr><td className="p-4 text-ink-dim" colSpan={listFields.length + 1}>Nothing here yet.</td></tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-white/5 last:border-0">
                {listFields.map((f) => (
                  <td key={f.key} className="p-4 text-ink-dim max-w-xs truncate">
                    {f.type === "boolean"
                      ? (row[f.key] ? "Yes" : "No")
                      : f.type === "tags"
                        ? (row[f.key] ?? []).join(", ")
                        : f.type === "relation"
                          ? relationLabel(f.key, row[f.key])
                          : f.type === "image"
                            ? (row[f.key] ? "✓ set" : "—")
                            : String(row[f.key] ?? "")}
                  </td>
                ))}
                <td className="p-4 text-right whitespace-nowrap">
                  <button onClick={() => openEdit(row)} className="text-cyan text-xs mr-4">Edit</button>
                  <button onClick={() => handleDelete(row.id)} className="text-red-400 text-xs">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && editing && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-6" onClick={() => setShowForm(false)}>
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSave}
            className="glass-card bg-navy-2 p-8 w-full max-w-lg max-h-[85vh] overflow-y-auto"
          >
            <h2 className="font-display text-lg mb-6">{editing.id ? "Edit" : "Add"} {title.replace(/s$/, "")}</h2>

            {fields.map((f) => (
              <div key={f.key} className="mb-4">
                <label className="text-xs text-ink-dim block mb-1">{f.label}</label>
                {f.type === "textarea" && (
                  <textarea
                    required={f.required}
                    rows={3}
                    value={editing[f.key] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan"
                  />
                )}
                {f.type === "boolean" && (
                  <input
                    type="checkbox"
                    checked={!!editing[f.key]}
                    onChange={(e) => setEditing({ ...editing, [f.key]: e.target.checked })}
                    className="w-4 h-4"
                  />
                )}
                {f.type === "tags" && (
                  <input
                    type="text"
                    placeholder="Comma-separated, e.g. React, Next.js, Supabase"
                    value={(editing[f.key] ?? []).join(", ")}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        [f.key]: e.target.value.split(",").map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan"
                  />
                )}
                {f.type === "image" && (
                  <ImageUpload
                    value={editing[f.key] ?? ""}
                    onChange={(url) => setEditing({ ...editing, [f.key]: url })}
                  />
                )}
                {f.type === "relation" && (
                  <select
                    required={f.required}
                    value={editing[f.key] ?? ""}
                    onChange={(e) => setEditing({ ...editing, [f.key]: e.target.value })}
                    className="w-full bg-navy-2 border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan"
                  >
                    <option value="">— none —</option>
                    {(relationOptions[f.key] ?? []).map((o) => (
                      <option key={o.id} value={o.id}>{o.label}</option>
                    ))}
                  </select>
                )}
                {(f.type === "text" || f.type === "url" || f.type === "number") && (
                  <input
                    type={f.type === "number" ? "number" : f.type === "url" ? "url" : "text"}
                    required={f.required}
                    value={editing[f.key] ?? ""}
                    onChange={(e) =>
                      setEditing({
                        ...editing,
                        [f.key]: f.type === "number" ? Number(e.target.value) : e.target.value,
                      })
                    }
                    className="w-full bg-white/[0.02] border border-white/10 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan"
                  />
                )}
              </div>
            ))}

            {error && <p className="text-red-400 text-xs mb-4">{error}</p>}

            <div className="flex gap-3 mt-6">
              <button type="submit" disabled={saving} className="btn-primary text-sm flex-1 justify-center">
                {saving ? "Saving..." : "Save"}
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-ghost text-sm flex-1 justify-center">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
