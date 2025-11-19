/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// Skip env import during build to avoid hanging
// Vercel sets SKIP_ENV_VALIDATION=true during build
if (!process.env.SKIP_ENV_VALIDATION) {
  require("./src/env.js");
}

/** @type {import("next").NextConfig} */
const config = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["picsum.photos"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "8mb",
    },
  },
  // Optimize build performance
  swcMinify: true,
  // Skip database operations during build - use default output
  // Reduce memory usage during build
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Optimize for production builds
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: "deterministic",
      };
    }
    
    return config;
  },
};
export default config;
