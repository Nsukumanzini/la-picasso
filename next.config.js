/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // ESLint runs separately in CI; skip during Vercel build to prevent circular-ref failures
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Type errors are surfaced in the editor; skip re-checking at Vercel build time
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
