import { Bot } from "structures/Bot";
import * as DJS from "discord.js";
import { NextApiResponse } from "next";
import { ApiRequest } from "types/ApiRequest";
import { prisma } from "utils/prisma";
import { reactions, ReactionsReactions } from "@prisma/client";

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

  switch (method) {
    case "POST": {
      try {
        const body = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
        const reactions = body.reactions as reactions[];

        if (!reactions) {
          return res.status(400).json({
            error: "Please fill in all fields",
            status: "error",
          });
        }

        let errored = false;

        await Promise.all(
          reactions.map(async (reaction) => {
            if (!reaction.reactions || reaction.reactions.length <= 0) {
              errored = true;
              return res.status(400).json({
                error: "Each reaction must have at least 1 emoji to react to.",
                status: "error",
              });
            }

            const dbReaction = await prisma.reactions.findUnique({
              where: { id: reaction.id },
            });

            if (dbReaction) {
              await updateReactionMessage(reaction, req.bot);

              dbReaction.reactions = reaction.reactions;
            } else {
              const data = await createNewReaction(reaction, req.bot);
              if (!data || typeof data === "string") {
                errored = true;

                // "data" can an error message
                const error = data || "An error occurred, please try again later";

                return res.status(400).json({
                  error,
                  status: "error",
                });
              }

              const obj = {
                message_id: data.id,
                channel_id: data.channel.id,
                guild_id: String(query.id),
                reactions: reaction.reactions,
                editable: false,
              };

              const newReaction = await prisma.reactions.create({
                data: obj,
              });

              return newReaction;
            }
          }),
        );

        // if there was an error in the `Promise.all`, return here since we already sent the response
        if (errored) return;

        return res.json({ status: "success" });
      } catch (e) {
        console.error(e);
        return res.status(500).json({
          error: "An error occurred",
          status: "error",
        });
      }
    }
    case "DELETE": {
      const id = typeof req.body === "string" ? JSON.parse(req.body)?.id : req.body.id;

      const reaction = await prisma.reactions.findUnique({
        where: { id },
      });

      if (!reaction) {
        return res.status(404).json({
          error: "Reaction was not found",
        });
      }

      const channel = (await req.bot.channels
        .fetch(reaction.channel_id)
        .catch(() => null)) as DJS.TextChannel | null;

      const message = await channel?.messages.fetch(reaction.message_id).catch(() => null);
      message?.deletable && (await message.delete());

      await prisma.reactions.deleteMany({
        where: { id },
      });

      return res.json({ status: "success" });
    }
    default: {
      return res.status(405).json({ error: "Method not allowed", status: "error" });
    }
  }
}

/**
 * send a new message with the embed for users to click on the reactions
 */
async function createNewReaction(reaction: reactions, bot: Bot): Promise<DJS.Message | string> {
  const channel = (await bot.channels.fetch(reaction.channel_id).catch(() => null)) as
    | DJS.TextChannel
    | DJS.NewsChannel
    | null;

  if (!channel) return "Channel was not found.";
  if (![DJS.ChannelType.GuildText, DJS.ChannelType.GuildNews].includes(channel.type)) {
    return "Channel must be a text channel.";
  }

  if (!channel.permissionsFor(bot.user!)?.has(DJS.PermissionFlagsBits.SendMessages)) {
    return "Bot does not have `SendMessages` permissions in this channel.";
  }

  const description = await _createDescription(reaction.reactions, channel.guild);

  /**
   * create embed and send message with embed
   */
  const embed = bot.utils
    .baseEmbed({ author: bot.user! })
    .setTitle("Reaction Role")
    .setDescription(description);

  const message = await channel.send({ embeds: [embed] });

  /**
   * add all reactions to message
   */
  await Promise.all(
    reaction.reactions.map(async (r) => {
      await message.react(r.emoji);
    }),
  );

  return message;
}

async function updateReactionMessage(reaction: reactions, bot: Bot): Promise<DJS.Message | string> {
  const channel = (await bot.channels
    .fetch(reaction.channel_id)
    .catch(() => null)) as DJS.TextChannel | null;

  if (!channel) return "Channel was not found";

  const description = await _createDescription(reaction.reactions, channel.guild);

  /**
   * create embed and send message with embed
   */
  const embed = bot.utils
    .baseEmbed({ author: bot.user! })
    .setTitle("Reaction Role")
    .setDescription(description);

  const message = await channel.messages.fetch(reaction.message_id).catch(() => null);
  if (!message) return "The original message was not found";

  await message.edit({ embeds: [embed] });
  await message.reactions.removeAll();

  /**
   * add all reactions to message
   */
  await Promise.all(
    reaction.reactions.map(async (r) => {
      await message.react(r.emoji);
    }),
  );

  return message;
}

async function _createDescription(reactions: ReactionsReactions[], guild: DJS.Guild) {
  const strings: string[] = [];

  for (let i = 0; i < reactions.length; i++) {
    const role = await guild.roles.fetch(reactions[i].role_id);

    if (role) {
      strings.push(`${reactions[i].emoji}: ${role}`);
    }
  }

  return strings.join("\n");
}
