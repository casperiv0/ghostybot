import { NextApiResponse } from "next";
import ApiRequest from "../../../interfaces/ApiRequest";

export default function handler(req: ApiRequest, res: NextApiResponse) {
  const { discordApiUrl, callbackUrl } = req.bot.config.dashboard;
  const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"];

  const url = `${discordApiUrl}oauth2/authorize?client_id=${DISCORD_CLIENT_ID}&redirect_uri=${encodeURIComponent(
    callbackUrl
  )}&response_type=code&scope=${encodeURIComponent(
    "identify guilds"
  )}&prompt=consent&response_type=code`;

  return res.redirect(url);
}
