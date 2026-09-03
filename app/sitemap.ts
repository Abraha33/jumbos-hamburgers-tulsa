import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-data";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ["", 1], ["/menu", .95], ["/our-story", .75], ["/contact", .9], ["/gallery", .6],
  ].map(([path, priority]) => ({ url: `${siteUrl}${path}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: priority as number }));
}
