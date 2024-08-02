/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['next-mdx-remote'],

  images: {
    formats: ['image/avif', 'image/webp'],
    domains: ['www.sherbolotarbaev.co', 'lh3.googleusercontent.com'],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [{ loader: '@svgr/webpack', options: { icon: true } }],
    });

    return config;
  },
};

export default nextConfig;
