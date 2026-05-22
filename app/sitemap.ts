import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://condenser.codemintah.dev";
  const now = new Date();

  return [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/video`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];
}
