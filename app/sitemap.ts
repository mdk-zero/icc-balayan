import type { MetadataRoute } from "next";
import { posts } from "@/lib/news";
import { allPages } from "@/lib/site";

export const dynamic = "force-static";

const base = "https://iccbalayan.edu.ph";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: base },
    ...allPages().map((page) => ({ url: `${base}${page.href}/` })),
    ...posts.map((post) => ({ url: `${base}/news/${post.slug}/`, lastModified: post.date })),
  ];
}
