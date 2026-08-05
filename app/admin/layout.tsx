import Link from "next/link";
import SignOutButton from "@/components/admin/SignOutButton";

const NAV = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/blog", label: "Blog Posts" },
  { href: "/admin/blog-categories", label: "Blog Categories" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Site Settings" },
];

// Auth + admin-role checking happens in middleware.ts before any request
// reaches here, so this layout can assume the visitor is an authenticated admin.
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-navy text-ink">
      <aside className="w-60 shrink-0 border-r border-white/5 p-6 hidden md:block">
        <div className="font-display font-bold mb-8">
          Ayfasco<span className="text-cyan">Tech</span>
          <span className="block text-xs text-ink-dim font-normal mt-1">Admin Dashboard</span>
        </div>
        <nav className="flex flex-col gap-1 text-sm">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="px-3 py-2 rounded-lg text-ink-dim hover:text-ink hover:bg-white/5"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-10">
          <SignOutButton />
        </div>
      </aside>
      <main className="flex-1 p-6 md:p-10 overflow-x-hidden">{children}</main>
    </div>
  );
}
