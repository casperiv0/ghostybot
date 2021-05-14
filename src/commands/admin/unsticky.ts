import { Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class UnStickyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "unsticky",
      description: "Sticky a message to the bottom of the screen",
      aliases: ["removesticky"],
      category: "admin",
      botPermissions: [Permissions.FLAGS.MANAGE_MESSAGES, Permissions.FLAGS.ADMINISTRATOR],
      memberPermissions: [Permissions.FLAGS.MANAGE_MESSAGES],
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      message.deletable && message.delete();

      await this.bot.utils.removeSticky(message.channel.id);

      message.channel.send(lang.ADMIN.STICKY_CLEAR.replace("{channel}", `${message.channel}`));
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
