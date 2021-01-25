import { Message } from "discord.js";
import morseCode from "../../data/morse";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class MorseCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "morse",
      description: "Convert a string to morse code",
      category: "util",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const morse = args
        .join(" ")
        .toLowerCase()
        .replace(/./g, (x) => `${morseCode[x]}\u2001`)
        .trim();

      if (morse.includes("undefined")) {
        return message.channel.send(lang.UTIL.TEXT_NOT_SUP);
      }

      message.channel.send(morse);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
