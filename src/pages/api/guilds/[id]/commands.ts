import { NextApiResponse } from "next";
import { ApiRequest } from "types/ApiRequest";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  try {
    await req.bot.utils.checkAuth(req, { guildId: query.id.toString() });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }

  const guild = await req.bot.utils.getGuildById(query.id.toString());
  if (!guild) {
    return res.json({
      status: "error",
      error: "An unexpected error occurred",
    });
  }

  switch (method) {
    case "PUT": {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      const { type, name } = body;

      if (!type || !name) {
        return res.status(400).json({ status: "error" });
      }

      if (type === "enable") {
        await req.bot.utils.updateGuildById(query.id.toString(), {
          disabled_commands: guild.disabled_commands.filter((c) => c !== name.toLowerCase()),
        });
      } else if (type === "disable") {
        await req.bot.utils.updateGuildById(query.id.toString(), {
          disabled_commands: [...guild.disabled_commands, name],
        });
      } else {
        return res.status(400).json({ status: "error", error: "invalid type" });
      }

      return res.json({ status: "success" });
    }

    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}
