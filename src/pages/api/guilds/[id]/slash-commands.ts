import DJS from "discord.js";
import { NextApiResponse } from "next";
import { ApiRequest } from "types/ApiRequest";
import { Constants } from "utils/constants";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method, query } = req;

  try {
    await req.bot.utils.checkAuth(req, { guildId: `${query.id}` });
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

  const discordGuild = await req.bot.guilds.fetch(query.id as DJS.Snowflake);
  if (!discordGuild) {
    return res.json({
      status: "error",
      error: "An unexpected error occurred",
    });
  }

  function includesCommand(commandName: string) {
    return req.bot.interactions.find((v) => v.options.name === commandName);
  }

  switch (method) {
    case "GET": {
      const { name } = query;

      if (!name) {
        return res.json({
          error: "`name` is required",
          status: "error",
        });
      }

      const command = guild.slash_commands.find(
        (cmd) => cmd.name.toLowerCase() === `${name}`.toLowerCase(),
      );

      if (!command) {
        return res.json({
          error: "Command not found",
          status: "error",
          command: null,
        });
      }

      const gSlashCommand = await discordGuild.commands.fetch(command?.slash_cmd_id);

      return res.json({
        command: {
          ...command,
          id: gSlashCommand.id,
          description: gSlashCommand.description,
        },
        status: "success",
      });
    }
    case "POST": {
      const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;

      if (!body.name?.trim() || !body.response?.trim() || !body.description?.trim()) {
        return res.json({
          error: "Please fill in all fields",
          status: "error",
        });
      }

      const commandName = body.name.toLowerCase();
      if (body.response.length > Constants.MaxCommandLength) {
        return res.json({
          status: "error",
          error: `Command response cannot be longer than ${Constants.MaxCommandLength} characters`,
        });
      }

      if (guild.slash_commands.length >= Constants.MaxSlashCommands) {
        return res.json({
          error: `Guild cannot have more than ${Constants.MaxSlashCommands} slash commands`,
          status: "error",
        });
      }

      if (guild.slash_commands?.find((x) => x.name === commandName)) {
        return res.json({
          error: "This command name already exists for this guild",
          status: "error",
        });
      }

      if (commandName === "help" || includesCommand(commandName)) {
        return res.json({
          error: "This command name is already in use by the bot!",
          status: "error",
        });
      }

      try {
        const command = await discordGuild?.commands.create({
          type: "CHAT_INPUT",
          name: commandName,
          description: body.description,
        });

        await req.bot.utils.updateGuildById(`${query.id}`, {
          slash_commands: [
            ...guild.slash_commands,
            {
              description: body.description,
              name: commandName,
              response: body.response,
              slash_cmd_id: command.id,
            },
          ],
        });

        const cmdData = {
          description: body.description,
          name: commandName,
          response: body.response,
          slash_cmd_id: command.id,
        };

        return res.json({ command: cmdData, status: "success" });
      } catch (e) {
        if ((e as any).httpStatus === 403) {
          return res.json({
            error: "Missing permissions",
            status: "error",
          });
        }

        return res.json({
          error: "An error occurred",
          status: "error",
        });
      }
    }
    case "PUT": {
      const body = JSON.parse(req.body);
      const { commandId, name, response, description } = body;

      if (!commandId || !response || !name || !description) {
        return res.status(400).json({ status: "error" });
      }

      const command = guild.slash_commands.find((cmd) => cmd.slash_cmd_id === commandId);

      if (!command) {
        return res.json({
          error: "Command was not found",
          status: "error",
        });
      }

      if (name === "help" || includesCommand(name)) {
        return res.json({
          error: "This command name is already in use by the bot!",
          status: "error",
        });
      }

      if (guild.slash_commands.length >= 50) {
        return res.json({
          error: "Guild cannot have more than 50 slash commands",
          status: "error",
        });
      }

      await discordGuild?.commands.edit(commandId, {
        type: "CHAT_INPUT",
        name,
        description: body.description,
      });

      req.bot.utils.updateGuildById(`${query.id}`, {
        slash_commands: guild.slash_commands.map((cmd) => {
          if (cmd.name === name) {
            cmd.name = name;
            cmd.response = response;
          }

          return cmd;
        }),
      });

      return res.json({ status: "success" });
    }
    case "DELETE": {
      const command = guild.slash_commands.find(
        (v) => v.name.toLowerCase() === (query.name as string).toLowerCase(),
      );

      if (!command) {
        return res.json({
          error: "Command was not found",
          status: "error",
        });
      }

      const filtered = guild.slash_commands?.filter(
        (cmd) => cmd.slash_cmd_id !== command?.slash_cmd_id,
      );

      discordGuild.commands.delete(command?.slash_cmd_id);

      await req.bot.utils.updateGuildById(`${query.id}`, { slash_commands: filtered });

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
