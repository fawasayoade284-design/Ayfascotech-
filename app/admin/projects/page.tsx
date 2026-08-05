"use client";

import CrudManager from "@/components/admin/CrudManager";

export default function ProjectsAdminPage() {
  return (
    <CrudManager
      table="projects"
      title="Projects"
      description="Manage the case studies shown in your portfolio section."
      orderBy="sort_order"
      fields={[
        { key: "title", label: "Title", type: "text", required: true },
        { key: "slug", label: "Slug", type: "text", required: true },
        { key: "summary", label: "Summary", type: "textarea", showInList: false },
        { key: "story", label: "Project Story", type: "textarea", showInList: false },
        { key: "challenges", label: "Challenges", type: "textarea", showInList: false },
        { key: "solutions", label: "Solutions", type: "textarea", showInList: false },
        { key: "results", label: "Results", type: "textarea", showInList: false },
        { key: "tech_stack", label: "Tech Stack", type: "tags" },
        { key: "cover_image_url", label: "Cover Image", type: "image", showInList: false },
        { key: "live_url", label: "Live Demo URL", type: "url", showInList: false },
        { key: "github_url", label: "GitHub URL", type: "url", showInList: false },
        { key: "featured", label: "Featured", type: "boolean" },
        { key: "published", label: "Published", type: "boolean" },
      ]}
    />
  );
}
