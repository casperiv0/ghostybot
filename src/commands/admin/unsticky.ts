import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class UnStickyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "unsticky",
      description: "Sticky a message to the bottom of the screen",
      aliases: ["removesticky"],
      category: "admin",
      botPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
      memberPermissions: ["MANAGE_MESSAGES"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      message.deletable && message.delete();

      await bot.utils.removeSticky(message.channel.id);

      message.channel.send(lang.ADMIN.STICKY_CLEAR.replace("{channel}", `${message.channel}`));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
