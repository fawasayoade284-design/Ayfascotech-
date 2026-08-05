"use client";

import CrudManager from "@/components/admin/CrudManager";

export default function TestimonialsAdminPage() {
  return (
    <CrudManager
      table="testimonials"
      title="Testimonials"
      description="Manage the client reviews shown on your homepage."
      fields={[
        { key: "client_name", label: "Client Name", type: "text", required: true },
        { key: "client_role", label: "Client Role", type: "text" },
        { key: "company", label: "Company", type: "text" },
        { key: "content", label: "Testimonial", type: "textarea", required: true, showInList: false },
        { key: "rating", label: "Rating (1-5)", type: "number" },
        { key: "avatar_url", label: "Avatar", type: "image", showInList: false },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}
