import { handleApiRequest } from "../../../utils/functions";
import { token } from "../../../../config.json";

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      const guild = await handleApiRequest(
        `/guilds/${query.id}/preview`,
        { type: "Bot", data: token },
        "GET"
      );

      if (guild.error || guild.message) {
        return res.json({
          error: guild.error || guild.message,
          status: "error",
          guild: {},
        });
      }

      return res.json({ guild: guild, status: "success" });
    }
    default: {
      return res.json({ error: "Method not allowed", status: "error" });
    }
  }
}
