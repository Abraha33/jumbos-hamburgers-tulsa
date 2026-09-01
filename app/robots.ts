import type { MetadataRoute } from "next";

const siteUrl = "https://jumbos-hamburgers-tulsa.contact479101.chatgpt.site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
