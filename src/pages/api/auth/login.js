import { dashboard } from "../../../../config.json";

export default function handler(req, res) {
  const { clientId, callbackUrl, discordApiUrl } = dashboard;
  const url = `${discordApiUrl}oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&response_type=code&scope=${encodeURIComponent(
    "identify guilds"
  )}&prompt=consent&response_type=code`;

  return res.redirect(url);
}
