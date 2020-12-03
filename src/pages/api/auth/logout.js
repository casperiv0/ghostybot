import fetch from "node-fetch";
import { setCookie } from "nookies";
import { encode } from "../../../utils/functions";
import { dashboard } from "../../../../config.json";

export default async function (req, res) {
  const token = req.cookies.token;
  const { clientId, clientSecret } = dashboard;

  await fetch("https://discord.com/api/oauth2/token/revoke", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({
      token: token,
      client_id: clientId,
      client_secret: clientSecret,
    }),
  });

  setCookie({ res }, "token", "", {
    expires: new Date(Date.now()),
    httpOnly: true,
    path: "/",
  });

  return res.redirect("/");
}
