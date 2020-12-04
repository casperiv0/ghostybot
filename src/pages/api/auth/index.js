import { handleApiRequest } from "../../../utils/functions";

export default async function handler(req, res) {
  const { method, headers } = req;

  switch (method) {
    case "POST": {
      const token = req.cookies.token || headers.auth;
      const data = await handleApiRequest("/users/@me", {
        type: "Bearer",
        data: token,
      });

      if (data.error) {
        return res.json({
          error: data.error,
          status: "error",
          invalid_token: data.error === "invalid_token",
        });
      }

      return res.json({ user: data });
    }
    default: {
      return res.json({ error: "Method not allowed", status: "error" });
    }
  }
}
