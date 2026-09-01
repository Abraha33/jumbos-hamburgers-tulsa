import type { MetadataRoute } from "next";

const siteUrl = "https://jumbos-hamburgers-tulsa.contact479101.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
