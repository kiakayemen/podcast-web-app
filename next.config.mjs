/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    remotePatterns: [      {
      protocol: 'https',
      hostname: 'assets.pippa.io',
    },
]},
  
};

export default nextConfig;