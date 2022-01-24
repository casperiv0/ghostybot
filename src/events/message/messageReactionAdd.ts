import * as DJS from "discord.js";
import ReactionsModel, { Reaction } from "models/Reactions.model";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

const neededPerms = [
  DJS.Permissions.FLAGS.MANAGE_MESSAGES,
  DJS.Permissions.FLAGS.MANAGE_ROLES,
  DJS.Permissions.FLAGS.READ_MESSAGE_HISTORY,
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

      if (!guild.me?.permissions.has(neededPerms)) {
        return;
      }

      if (!guild) return;

      const member = guild.members.cache.get(user.id);
      if (!member) return;

      const dbReaction = await ReactionsModel.findOne({
        guild_id: guild.id,
        message_id: react.message.id,
      });
      if (!dbReaction) return;

      const reaction = dbReaction.reactions.find(
        (r: Reaction) => r.emoji === react.emoji.toString(),
      );
      if (!reaction) return;

      if (!member.roles.cache.has(reaction.role_id)) {
        member.roles.add(reaction.role_id);
      } else {
        member.roles.remove(reaction.role_id);
      }

      const channel = guild.channels.cache.get(dbReaction.channel_id) as DJS.TextChannel;
      if (!channel) return;
      if (!channel.permissionsFor(guild.me).has([neededPerms])) return;

      if (!channel?.permissionsFor(bot.user?.id!)?.has(DJS.Permissions.FLAGS.VIEW_CHANNEL)) {
        return;
      }

      await react.users.remove(user.id);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
