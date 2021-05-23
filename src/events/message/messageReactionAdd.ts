import { Constants, MessageReaction, Permissions, TextChannel, User } from "discord.js";
import ReactionsModel, { Reaction } from "models/Reactions.model";
import Bot from "structures/Bot";
import Event from "structures/Event";

const neededPerms = [
  Permissions.FLAGS.MANAGE_MESSAGES,
  Permissions.FLAGS.MANAGE_ROLES,
  Permissions.FLAGS.READ_MESSAGE_HISTORY,
];

export default class MessageReactionAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.Events.MESSAGE_REACTION_ADD);
  }

  async execute(bot: Bot, react: MessageReaction, user: User) {
    try {
      if (user.bot) return;
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

      const channel = guild.channels.cache.get(dbReaction.channel_id) as TextChannel;
      if (!channel) return;
      if (!channel.permissionsFor(guild.me).has([neededPerms])) return;

      const msg = await channel.messages.fetch(dbReaction.message_id).catch(() => null);
      if (!msg) return;

      msg.reactions.resolve(react.emoji.toString())?.users.remove(user.id);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
