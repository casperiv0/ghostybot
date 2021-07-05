import { Message } from "discord.js";
import morseCode from "assets/ts/morse";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class MorseCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "morse",
      description: "Convert a string to morse code",
      category: "util",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const morse = args
        .join(" ")
        .toLowerCase()
        .replace(/./g, (x) => `${morseCode[x]}\u2001`)
        .trim();

      if (morse.includes("undefined")) {
        return message.channel.send({ content: lang.UTIL.TEXT_NOT_SUP });
      }

      message.channel.send({ content: morse });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
