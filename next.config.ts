import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.spoonacular.com'],
  },
  env: {
    NEXT_PUBLIC_BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL!,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY!,
  },
};

export default nextConfig;
