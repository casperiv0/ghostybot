import { handleApiRequest } from "../../utils/functions";

export default async function handler(req, res) {
  const { method } = req;

  switch (method) {
    case "GET": {
      console.log(req.cookies);
      const data = await handleApiRequest(
        "/users/@me/guilds",
        req.cookies.token,
        "GET"
      );

      // TODO: filter out guilds where user isn't a ADMINISTRATOR
      if (data.error) {
        return res.json({ error: data.error, status: "error" });
      }

      return res.json(data);
    }
    default: {
      return res.json({ error: "Method not allowed", status: "error" });
    }
  }
}
