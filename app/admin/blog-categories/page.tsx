"use client";

import CrudManager from "@/components/admin/CrudManager";

export default function BlogCategoriesAdminPage() {
  return (
    <CrudManager
      table="blog_categories"
      title="Blog Categories"
      description="Categories your blog posts can be filed under."
      orderBy="name"
      fields={[
        { key: "name", label: "Name", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
      ]}
    />
  );
}
