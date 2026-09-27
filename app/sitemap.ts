import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://ayfascotech.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://ayfascotech.vercel.app/ayfasco",
      lastModified: new Date(),
    },
    {
      url: "https://ayfascotech.vercel.app/blog",
      lastModified: new Date(),
    },
    {
      url: "https://ayfascotech.vercel.app/login",
      lastModified: new Date(),
    },
  ];
}
