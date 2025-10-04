/** @type {import('next').NextConfig} */
const nextConfig: import('next').NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ik.imagekit.io',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'raw.githubusercontent.com',
        port: '',
      },
    ],
  },
  // Skip build-time validation when using placeholder keys
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  // Force dynamic rendering for auth-protected pages
  experimental: {
    
  },
};

export default nextConfig;
