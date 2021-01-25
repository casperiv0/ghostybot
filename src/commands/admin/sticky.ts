import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class StickyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "sticky",
      description: "Sticky a message to the bottom of the screen",
      category: "admin",
      botPermissions: ["MANAGE_MESSAGES"],
      memberPermissions: ["MANAGE_MESSAGES"],
      requiredArgs: [{ name: "message" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const stickyMsg = args.join(" ");

      if (stickyMsg.length > 1800) {
        return message.channel.send(lang.ADMIN.STICKY_LONG);
      }

      const msg = lang.ADMIN.STICKY_READ + "\n\n" + stickyMsg;

      message.deletable && message.delete();

      const stickyMessage = await message.channel.send(msg);

      await bot.utils.addSticky(stickyMessage.id, message.channel.id, msg);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
