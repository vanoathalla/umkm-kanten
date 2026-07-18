import type { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://umkmkanten.com";

  // Static routes
  const staticRoutes = [
    "",
    "/tentang",
    "/kontak",
    "/peta-potensi",
    "/umkm",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  try {
    // Fetch all UMKM IDs from Supabase to create dynamic URLs
    const { data, error } = await supabase
      .from("umkm")
      .select("id");

    if (error) {
      console.error("Error fetching UMKM for sitemap:", error);
      return staticRoutes;
    }

    if (data) {
      const dynamicRoutes = data.map((item) => ({
        url: `${baseUrl}/umkm/${item.id}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      }));

      return [...staticRoutes, ...dynamicRoutes];
    }
  } catch (err) {
    console.error("Error generating sitemap dynamic routes:", err);
  }

  return staticRoutes;
}
