import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com", // Para manter os seus dados de Seed funcionando
      },
      {
        protocol: "https",
        hostname: "**.supabase.co", // Libera as imagens do seu Supabase Storage
      },
    ],
  },
};

export default nextConfig;
