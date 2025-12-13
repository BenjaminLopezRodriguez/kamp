/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";

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
  // Optimize for memory usage
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  // Reduce build memory by splitting and optimizing
  webpack: (config, { isServer, dev }) => {
    // Reduce memory usage during build
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // React and core framework
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/,
              priority: 40,
              enforce: true,
            },
            // Large libraries (Framer Motion, Lucide, etc)
            lib: {
              test: /[\\/]node_modules[\\/](framer-motion|lucide-react)[\\/]/,
              name: 'lib',
              priority: 35,
              reuseExistingChunk: true,
            },
            // Shared vendor code
            vendors: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 30,
              reuseExistingChunk: true,
            },
            // Common shared modules
            commons: {
              name: 'commons',
              minChunks: 2,
              priority: 20,
              reuseExistingChunk: true,
            },
          },
          maxInitialRequests: 25,
          minSize: 20000,
        },
      };
    }
    
    // Reduce bundle by excluding source maps in production
    if (!dev && !isServer) {
      config.devtool = false;
    }
    
    return config;
  },
};
export default config;
