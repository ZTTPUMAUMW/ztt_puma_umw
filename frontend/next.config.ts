import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Optimize images
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 3600,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Modern JS output
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },

  // Experimental optimizations
  experimental: {
    optimizePackageImports: ["@/components", "@/lib"],
    optimizeCss: true,
  },
};

export default withNextIntl(nextConfig);
