module.exports = {
  images: {
    domains: ["cdn.discordapp.com"] /* KEEP THIS OTHERWISE IMAGES WILL NOT LOAD */,
  },
  async redirects() {
    return [
      {
        source: "/add",
        destination:
          "https://discord.com/oauth2/authorize?client_id=632843197600759809&scope=bot&permissions=8",
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
};
