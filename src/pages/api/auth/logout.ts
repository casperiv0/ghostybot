import { NextApiResponse } from "next";
import { setCookie } from "nookies";
import { ApiRequest } from "types/ApiRequest";

export default async function (req: ApiRequest, res: NextApiResponse) {
  const token = req.cookies.token;
  const DISCORD_CLIENT_ID = process.env["DISCORD_CLIENT_ID"];
  const DISCORD_CLIENT_SECRET = process.env["DISCORD_CLIENT_SECRET"];

  await fetch("https://discord.com/api/oauth2/token/revoke", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: req.bot.utils.encode({
      token,
      client_id: DISCORD_CLIENT_ID,
      client_secret: DISCORD_CLIENT_SECRET,
    }),
  });

  setCookie({ res }, "token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
    path: "/",
  });

  return res.redirect("/");
}
