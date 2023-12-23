/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      },
    ],
  },
  // images: {
  //   domains: ['localhost', '127.0.0.1', 'upload.wikimedia.org'],
  // }
}

module.exports = nextConfig
