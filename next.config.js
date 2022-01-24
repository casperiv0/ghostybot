/* eslint-disable */
const { i18n } = require("./next-i18next.config");

module.exports = {
  typescript: {
    tsconfigPath: "./web.tsconfig.json",
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["cdn.discordapp.com"] /* KEEP THIS OTHERWISE IMAGES WILL NOT LOAD */,
  },
  async redirects() {
    return [
      {
        source: "/add",
        destination:
          "https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot+applications.commands&permissions=8",
        permanent: true,
      },
      {
        source: "/support",
        destination: "https://discord.gg/XxHrtkA",
        permanent: true,
      },
      {
        source: "/logout",
        destination: "/api/auth/logout",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/api/auth/login",
        permanent: true,
      },
    ];
  },
  reactStrictMode: true,
  experimental: {
    esmExternals: true,
    turboMode: true,
  },
  webpack: (config, { dev, isServer }) => {
    // fixes 'cannot resolve 'erlpack' in discord.js/src'
    config.externals.push("erlpack");

    if (!dev && !isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        react: "preact/compat",
        "react-dom/test-utils": "preact/test-utils",
        "react-dom": "preact/compat",
      };
    }

    return config;
  },

  i18n,
};
