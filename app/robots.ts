import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/"],
      },
    ],
    sitemap: "https://condenser.codemintah.dev/sitemap.xml",
    host: "https://condenser.codemintah.dev",
  };
}
