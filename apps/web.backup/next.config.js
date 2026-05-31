const { withBundleAnalyzer } = require('@next/bundle-analyzer');

module.exports = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['supabase.co', 'your-storage-domain.supabase.co'],
  },
  webpack: (config) => {
    // Enable sourcemaps for better debugging
    config.devtool = 'source-map';
    return config;
  },
});