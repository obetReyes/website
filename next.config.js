/** @type {import('next').NextConfig} */
const nextConfig = {
  output:"standalone",
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
