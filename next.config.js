module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['supabase.co', 'your-storage-domain.supabase.co'],
  },
  webpack: (config) => {
    config.devtool = 'source-map';
    return config;
  }
};
