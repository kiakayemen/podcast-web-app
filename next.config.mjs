/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.pippa.io',
      },
      {
        protocol: 'https',
        hostname: 'i.scdn.co',
      },
      {
        protocol: 'https',
        hostname: 'rokhpodcast.ir',
      },
      {
        protocol: 'https',
        hostname: 'podcast.app',
      }

    ],
  },
};

export default nextConfig;