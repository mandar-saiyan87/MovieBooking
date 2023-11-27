/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "**",
      },
    ],
  },
  // images: {
  //   domains: ['localhost', '127.0.0.1', 'upload.wikimedia.org'],
  // }
}

module.exports = nextConfig
