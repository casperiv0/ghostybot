import { Message, TextChannel } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import ReactionsModel from "../../models/Reactions.model";

export default class RrRemoveCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "rrremove",
      description: "Add a reaction role",
      category: "reactions",
      usage: "<message_id>",
      aliases: ["rrdel", "rrr", "rrdelete"],
      requiredArgs: [{ name: "message_id" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [messageId] = args;

      const reaction = await ReactionsModel.findOne({
        guild_id: message.guild?.id,
        message_id: messageId,
      });

      if (!reaction) {
        return message.channel.send(lang.REACTIONS.NOT_FOUND);
      }

      const channel = message.guild?.channels.cache.get(reaction.channel_id);

      let msg: Message | undefined;
      try {
        msg =
          (channel as TextChannel).messages.cache.get(messageId) ||
          (await (channel as TextChannel).messages.fetch(messageId));
      } catch {
        return message.channel.send(lang.REACTIONS.FOUND_NO_MSG);
      }

      if (!msg) {
        return message.channel.send(lang.REACTIONS.FOUND_NO_MSG);
      }

      msg.deletable && msg.delete();
      await ReactionsModel.findOneAndDelete({ message_id: messageId });

      return message.channel.send(lang.REACTIONS.DELETE_SUCCESS);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
