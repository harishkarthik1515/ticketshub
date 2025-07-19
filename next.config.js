/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.pexels.com', 'i.ibb.co'],
    unoptimized: true
  },
  experimental: {
    appDir: true
  },
  async rewrites() {
    return [
    ];
  }
};

module.exports = nextConfig;