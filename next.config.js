/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'bsfreekib.nyc3.cdn.digitaloceanspaces.com'
      },
    ],
  },
}

module.exports = nextConfig
