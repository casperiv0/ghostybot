import { NextApiResponse } from "next";
import ApiRequest from "../../../../interfaces/ApiRequest";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  try {
    await req.bot.utils.checkAuth(req);
  } catch (e) {
    return res.json({ status: "error", error: e });
  }

  const guild = await req.bot.utils.getGuildById(`${query.id}`);
  if (!guild) {
    return res.json({
      status: "error",
      error: "An unexpected error occurred",
    });
  }

  switch (method) {
    case "POST": {
      const body = JSON.parse(req.body);

      if (!body.name?.trim() || !body.response?.trim()) {
        return res.json({
          error: "Please fill in all fields",
          status: "error",
        });
      }

      const commandName = body.name.toLowerCase();
      if (body.response.length > 1800) {
        return res.json({
          status: "error",
          error: "Command response cannot be longer than 1800 characters",
        });
      }

      if (guild.custom_commands?.find((x) => x.name === commandName))
        return res.json({
          error: "This command name already exists for this guild",
          status: "error",
        });

      if (req.bot.commands.has(commandName)) {
        return res.json({
          error: "This command name is already in use by the bot!",
          status: "error",
        });
      }

      await req.bot.utils.updateGuildById(`${query.id}`, {
        custom_commands: [...guild.custom_commands, { name: commandName, response: body.response }],
      });

      return res.json({ status: "success" });
    }
    case "PUT": {
      const body = JSON.parse(req.body);
      const { type, name } = body;

      if (!type || !name) {
        return res.status(400).json({ status: "error" });
      }

      if (type === "enable") {
        await req.bot.utils.updateGuildById(`${query.id}`, {
          disabled_commands: guild.disabled_commands.filter((c) => c !== name.toLowerCase()),
        });
      } else if (type === "disable") {
        await req.bot.utils.updateGuildById(`${query.id}`, {
          disabled_commands: [...guild.disabled_commands, name],
        });
      } else {
        return res.status(400).json({ status: "error", error: "invalid type" });
      }

      return res.json({ status: "success" });
    }
    case "DELETE": {
      const filtered = guild.custom_commands?.filter(
        (cmd) => cmd.name.toLowerCase() !== (query.name as string).toLowerCase()
      );

      await req.bot.utils.updateGuildById(`${query.id}`, { custom_commands: filtered });

      return res.json({
        status: "success",
        message: `Successfully deleted command: ${query.name}`,
      });
    }
    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}
