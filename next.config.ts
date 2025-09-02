import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // Disable Turbopack temporarily to fix Google Fonts issue
    turbo: false,
  },
  // Ensure proper font optimization
  optimizeFonts: true,
};

export default nextConfig;
