import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" },
      // Supabase storage — required for UMKM images uploaded via admin
      { protocol: "https", hostname: "wdodrsbjnizedysminvk.supabase.co" },
    ],
  },
};

export default nextConfig;
