export default function handler(req, res) {
  const {
    dashboard: { discordApiUrl, callbackUrl },
  } = require("../../../../config.json");
  const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"];

  const url = `${discordApiUrl}oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&response_type=code&scope=${encodeURIComponent(
    "identify guilds"
  )}&prompt=consent&response_type=code`;

  return res.redirect(url);
}
