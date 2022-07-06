import DJS, { Role } from "discord.js";
import { NextApiResponse } from "next";
import hiddenGuildItems from "assets/json/hidden-items.json";
import { ApiRequest } from "types/ApiRequest";
import type { APIChannel } from "discord-api-types/v10";
import { prisma } from "utils/prisma";
import { reactions } from "@prisma/client";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id: guildId } = query;

  try {
    await req.bot.utils.checkAuth(req, { guildId: String(guildId) });
  } catch (e) {
    return res.json({ status: "error", error: e });
  }

  switch (method) {
    case "GET": {
      const discordGuild = await req.bot.guilds.fetch(query.id as DJS.Snowflake);
      const guild = await req.bot.utils.handleApiRequest(
        `/guilds/${query.id}`,
        { type: "Bot", data: process.env["DISCORD_BOT_TOKEN"]! },
        "GET",
      );

      const gSlashCommands = await discordGuild.commands.fetch().catch(() => null);
      const gChannels: APIChannel[] = await req.bot.utils.handleApiRequest(
        `/guilds/${query.id}/channels`,
        {
          type: "Bot",
          data: process.env["DISCORD_BOT_TOKEN"]!,
        },
        "GET",
      );

      if (guild.error || guild.message) {
        return res.json({
          error: guild.error || guild.message,
          status: "error",
          invalid_token: guild.error === "invalid_token",
        });
      }

      const g = await req.bot.utils.getGuildById(guild.id);

      if (!g) {
        return res.json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }

      guild.channels = gChannels.filter((c) => c.type === 0 || c.type === 5);
      guild.categories = gChannels.filter((c) => c.type === 4);
      guild.voice_channels = gChannels.filter((c) => c.type === 2);
      guild.categories.unshift({ id: null, name: "Disabled" });
      guild.channels.unshift({ id: null, name: "Disabled" });
      guild.roles.unshift({ id: null, name: "Disabled" });
      guild.voice_channels.unshift({ id: null, name: "Disabled" });
      guild.roles = (guild.roles as Role[])
        .filter((r) => r.name !== "@everyone")
        .filter((r) => !r.managed);

      if (gSlashCommands) {
        for (let i = 0; i < gSlashCommands.size; i++) {
          const command = [...gSlashCommands.values()][i];

          const dbCommand = g.slash_commands.find((c) => c.slash_cmd_id === command.id);
          if (!dbCommand) continue;

          guild.slash_commands = [
            ...(guild.slash_commands ?? []),
            {
              ...dbCommand,
              description: command.description,
              id: command.id,
            },
          ];
        }
      } else {
        guild.slash_commands = null;
      }

      hiddenGuildItems.forEach((item) => {
        guild[item] = undefined;
      });

      let reactions: reactions[] | null = null;
      if (req.query.reactions) {
        const _reactions = await prisma.reactions.findMany({
          where: {
            guild_id: query.id as string,
          },
        });
        reactions = _reactions;
      }

      const commands = req.bot.interactions.map((v) => {
        return v.options;
      });

      return res.json({
        guild: { ...g, ...guild, reactions },
        botCommands: commands.map((v) => {
          delete v.memberPermissions;
          delete v.botPermissions;

          return v;
        }),
        status: "success",
      });
    }
    case "POST": {
      const body = JSON.parse(req.body);
      const g = await req.bot.utils.getGuildById(String(guildId));

      if (!g) {
        return res.json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }

      if (body?.audit_channel) {
        await req.bot.utils.createWebhook(body.audit_channel, g.audit_channel);
      }

      await req.bot.utils.updateGuildById(String(guildId), body);

      return res.json({
        status: "success",
        message: "Successfully updated guild settings",
      });
    }
    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}
