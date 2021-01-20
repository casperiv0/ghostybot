import ReactionsModel, { Reaction } from "../../models/Reactions.model";

import { Message, MessageReaction, TextChannel, User } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class MessageReactionAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "messageReactionAdd");
  }

  async execute(bot: Bot, react: MessageReaction, user: User) {
    try {
      if (user.bot) return;
      const { guild } = react.message;
      if (!guild?.available) return;

      if (!guild.me?.hasPermission(["MANAGE_MESSAGES", "MANAGE_ROLES"])) return;
      if (!guild) return;

      const member = guild.members.cache.get(user.id);
      if (!member) return;

      const dbReaction = await ReactionsModel.findOne({
        guild_id: guild.id,
        message_id: react.message.id,
      });
      if (!dbReaction) return;

      const reaction = dbReaction.reactions.find((r: Reaction) => r.emoji === react.emoji.toString());
      if (!reaction) return;

      if (!member.roles.cache.has(reaction.role_id)) {
        member.roles.add(reaction.role_id);
      } else {
        member.roles.remove(reaction.role_id);
      }

      const channel = guild.channels.cache.get(dbReaction.channel_id) as TextChannel;
      if (!channel) return;

      let msg: Message | undefined;
      try {
        msg = await channel.messages.fetch(dbReaction.message_id);
      } catch {
        return;
      }
      if (!msg) return;

      msg.reactions.resolve(react.emoji.toString())?.users.remove(user.id);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
