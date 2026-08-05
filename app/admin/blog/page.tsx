"use client";

import CrudManager from "@/components/admin/CrudManager";

export default function BlogAdminPage() {
  return (
    <CrudManager
      table="blog_posts"
      title="Blog Posts"
      description="Write and publish articles. Unpublished posts are only visible here."
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "excerpt", label: "Excerpt", type: "textarea", showInList: false },
        { key: "content_markdown", label: "Content (Markdown)", type: "textarea", required: true, showInList: false },
        { key: "cover_image_url", label: "Cover Image", type: "image", showInList: false },
        { key: "category_id", label: "Category", type: "relation", relationTable: "blog_categories", relationLabelKey: "name" },
        { key: "tags", label: "Tags", type: "tags", showInList: false },
        { key: "read_minutes", label: "Read Minutes", type: "number", showInList: false },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}
