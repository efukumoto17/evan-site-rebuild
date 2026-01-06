module.exports = {
  reactStrictMode: true,
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Don't resolve these modules on the client to prevent errors
      config.resolve.fallback = {
        ...config.resolve.fallback,
        undici: false,
        'genius-lyrics': false,
      };

      // Exclude genius-lyrics from client bundle
      config.externals = config.externals || [];
      config.externals.push('genius-lyrics');
    }
    return config;
  },
}
