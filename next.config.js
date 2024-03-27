/**
 * @format
 * @type {import('next').NextConfig}
 */

const nextConfig = {
  images: {
    domains: [process.env.IMAGES_DOMAIN],
  },
};

module.exports = nextConfig;
