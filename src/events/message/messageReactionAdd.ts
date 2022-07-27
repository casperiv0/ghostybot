import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";
import { prisma } from "utils/prisma";

const neededPerms = [
  DJS.PermissionFlagsBits.ManageMessages,
  DJS.PermissionFlagsBits.ManageRoles,
  DJS.PermissionFlagsBits.ReadMessageHistory,
];

export default class MessageReactionAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "messageReactionAdd");
  }

  async execute(bot: Bot, react: DJS.MessageReaction, user: DJS.User) {
    try {
      // ignore bots
      if (user.bot) return;
      if (!react.emoji) return;

      const { guild } = react.message;
      if (!guild?.available) return;
      const me = this.bot.utils.getMe(react.message.guild);
      if (!me?.permissions.has(neededPerms)) {
        return;
      }

      if (!guild) return;

      const member = guild.members.cache.get(user.id);
      if (!member) return;

      const dbReaction = await prisma.reactions.findFirst({
        where: { guild_id: guild.id, message_id: react.message.id },
      });

      if (!dbReaction) return;

      const reaction = dbReaction.reactions.find((r) => r.emoji === react.emoji.toString());
      if (!reaction) return;

      if (!member.roles.cache.has(reaction.role_id)) {
        member.roles.add(reaction.role_id);
      } else {
        member.roles.remove(reaction.role_id);
      }

      const channel = guild.channels.cache.get(dbReaction.channel_id) as DJS.TextChannel;
      if (!channel) return;
      if (!channel.permissionsFor(me).has([neededPerms])) return;

      if (!channel.permissionsFor(bot.user!.id)?.has(DJS.PermissionFlagsBits.ViewChannel)) {
        return;
      }

      await react.users.remove(user.id);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
