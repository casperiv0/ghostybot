import DJS, { Role, Snowflake } from "discord.js";
import { NextApiResponse } from "next";
import hiddenGuildItems from "assets/json/hidden-items.json";
import { ApiRequest } from "types/ApiRequest";
import ReactionsModel, { IReaction } from "models/Reactions.model";
import { APIChannel } from "discord-api-types";

export default async function handler(req: ApiRequest, res: NextApiResponse) {
  const { method, query } = req;
  const { id: guildId } = query;

  try {
    await req.bot.utils.checkAuth(req, { guildId: guildId.toString() });
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

      let reactions: null | IReaction[] = null;
      if (req.query.reactions) {
        reactions = await ReactionsModel.find({ guild_id: query.id as Snowflake });
      }

      const commands = req.bot.interactions.map((v) => {
        return v.options;
      });

      return res.json({
        guild: { ...g.toJSON(), ...guild, reactions },
        botCommands: commands,
        status: "success",
      });
    }
    case "POST": {
      const body = JSON.parse(req.body);
      const g = await req.bot.utils.getGuildById(guildId.toString());

      if (!g) {
        return res.json({
          error: "An unexpected error occurred",
          status: "error",
        });
      }

      if (body?.audit_channel) {
        await req.bot.utils.createWebhook(body.audit_channel, g?.audit_channel || undefined);
      }

      if (body?.starboards_data?.enabled === true) {
        /**
         * check if starboards is enabled and no channel is provider
         */
        if (body.starboards_data?.channel_id !== "Disabled") {
          if (body?.starboards_data?.channel_id === null) {
            return res.json({
              error: "Starboards channel must be provided when starboards is enabled!",
              status: "error",
            });
          }

          try {
            const starboard = req.bot.starboardsManager.starboards.find(
              (s) =>
                s.channelId === g?.starboards_data?.channel_id &&
                s.options.emoji === g?.starboards_data?.emoji,
            );

            await req.bot.utils.createStarboard(
              {
                id: body?.starboards_data?.channel_id,
                guild: { id: g?.guild_id },
              },
              {
                emoji: body?.starboards_data?.emoji || "⭐",
              },
              {
                channelId: starboard?.channelId as DJS.Snowflake,
                emoji: starboard?.options.emoji,
              },
            );
          } catch (e) {
            req.bot.utils.sendErrorLog(e, "error");
          }
        } else {
          return res.json({
            error: "Starboards channel must be provided when starboards is enabled!",
            status: "error",
          });
        }
      } else {
        try {
          req.bot.starboardsManager.delete(g.starboards_data.channel_id, g?.starboards_data.emoji);
        } catch (e) {
          // eslint-disable-next-line quotes
          if (!e?.stack?.includes('Error: The channel "')) {
            req.bot.utils.sendErrorLog(e, "error");
            return res.json({
              error: "An error occurred when deleting the starboard, please try again later",
              status: "error",
            });
          }
        }
      }

      await req.bot.utils.updateGuildById(guildId.toString(), body);

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
