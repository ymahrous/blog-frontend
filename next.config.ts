import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Allow Next.js Image from any HTTPS source if needed later
  images: {
    remotePatterns: [],
  },
  // Make API URL available server-side too
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  },
};

export default nextConfig;
