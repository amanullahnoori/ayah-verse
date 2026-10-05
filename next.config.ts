import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A package-lock.json in the parent folder makes Next infer the wrong workspace root.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
