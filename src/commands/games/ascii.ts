import { Message } from "discord.js";
import figlet from "figlet";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class AsciiCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ascii",
      description: "Transform text to ascii",
      category: "games",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const text = args.join(" ");

      figlet.text(text, (e, txt) => {
        if (e) return;
        message.channel.send({ content: txt?.trimRight() ?? "UNKNOWN", code: true });
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
