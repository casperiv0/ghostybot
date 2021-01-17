import { NextApiResponse } from "next";
import ApiRequest from "../../../interfaces/ApiRequest";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method, headers } = req;

  switch (method) {
    case "POST": {
      const token = req.cookies.token || headers.auth;
      const data = await req.bot.utils.handleApiRequest("/users/@me", {
        type: "Bearer",
        data: `${token}`,
      });

      if (data.error) {
        return res.json({
          error: data.error,
          status: "error",
          invalid_token: data.error === "invalid_token",
        });
      }

      return res.json({
        user: { username: data.username, id: data.id, avatar: data.avatar },
      });
    }
    default: {
      return res.json({ error: "Method not allowed", status: "error" });
    }
  }
}
