import fetch from "node-fetch";
import jwt from "jsonwebtoken";
import { NextApiResponse } from "next";
import { setCookie } from "nookies";
import ApiRequest from "../../../interfaces/ApiRequest";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { query } = req;
  const callbackUrl = process.env["DASHBOARD_CALLBACK_URL"];
  const jwtSecret = process.env["DASHBOARD_JWT_SECRET"];
  const discordApiUrl = process.env["DASHBOARD_DISCORD_API_URL"];

  const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"];
  const DISCORD_CLIENT_SECRET = process.env["DISCORD_CLIENT_SECRET"];

  const { code, error, error_description } = query;

  if (error) {
    return res.redirect(`/error?error=${error_description}`);
  }

  if (!code) {
    return res.redirect(`/error?error=${encodeURIComponent("No code was provided")}`);
  }

  const data = await (await fetch(
    `${discordApiUrl}oauth2/token?grant_type=authorization_code&code=${code}&redirect_uri=${callbackUrl}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: req.bot.utils.encode({
        client_id: DISCORD_CLIENT_ID,
        client_secret: DISCORD_CLIENT_SECRET,
        grant_type: "authorization_code",
        code: code,
        redirect_uri: callbackUrl,
        scope: "identify guilds",
      }),
    }
  )).json();

  if (!data.access_token) {
    return res.redirect(
      `/error?error=${encodeURIComponent(
        "No access_token was provided from Discord. Please try again later"
      )}`
    );
  }

  const token = jwt.sign(data.access_token, jwtSecret);

  const expiresInMilliseconds = data.expires_in * 1000;

  setCookie({ res }, "token", token, {
    expires: new Date(Date.now() + expiresInMilliseconds),
    httpOnly: !process.env["DEV_MODE"], // do not set the 'true' if in 'dev'
    secure: !process.env["DEV_MODE"], // do not set the 'true' if in 'dev'
    path: "/",
  });

  res.redirect("/dashboard");
}
