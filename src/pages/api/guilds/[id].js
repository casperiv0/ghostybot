import {
  getGuildById,
  updateGuildById,
  handleApiRequest,
} from "../../../utils/functions";
import { token } from "../../../../config.json";

export default async function handler(req, res) {
  const { method, query } = req;

  switch (method) {
    case "GET": {
      const guild = await handleApiRequest(
        `/guilds/${query.id}`,
        { type: "Bot", data: token },
        "GET"
      );
      const gChannels = await handleApiRequest(
        `/guilds/${query.id}/channels`,
        {
          type: "Bot",
          data: token,
        },
        "GET"
      );

      if (guild.error || guild.message) {
        return res.json({
          error: guild.error || guild.message,
          status: "error",
          guild: {},
          invalid_token: guild.error === "invalid_token",
        });
      }

      const g = await getGuildById(guild.id);
      guild.channels = gChannels.filter((c) => {
        if (c.type === 4) return false;
        if (c.type === 2) return false;

        return true;
      }); /* remove category 'channels' */
      guild.roles = guild.roles.filter((r) => r.name !== "@everyone");

      return res.json({ guild: { ...guild, ...g._doc }, status: "success" });
    }
    case "POST": {
      const body = req.body;

      await updateGuildById(query.id, JSON.parse(body));
      return res.json({
        status: "success",
        message: "Successfully updated guild settings",
      });
    }
    default: {
      return res.json({ error: "Method not allowed", status: "error" });
    }
  }
}
