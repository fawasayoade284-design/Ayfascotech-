"use client";

import CrudManager from "@/components/admin/CrudManager";

export default function ServicesAdminPage() {
  return (
    <CrudManager
      table="services"
      title="Services"
      description="Manage the services listed on your homepage."
      orderBy="sort_order"
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "icon", label: "Icon (emoji)", type: "text" },
        { key: "description", label: "Description", type: "textarea" },
        { key: "sort_order", label: "Order", type: "number" },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}
