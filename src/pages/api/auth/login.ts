import { NextApiResponse } from "next";

export default function handler(_, res: NextApiResponse) {
  const discordApiUrl = process.env["DASHBOARD_DISCORD_API_URL"];
  const callbackUrl = process.env["DASHBOARD_CALLBACK_URL"];
  const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"];

  const url = `${discordApiUrl}oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    `${callbackUrl}`,
  )}&response_type=code&scope=${encodeURIComponent(
    "identify guilds",
  )}&prompt=consent&response_type=code`;

  return res.redirect(url);
}
