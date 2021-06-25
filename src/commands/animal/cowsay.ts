import { Message } from "discord.js";
import cowSay from "cowsay";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class CowSayCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cowsay",
      description: "Let a cow say something",
      usage: "<text>",
      category: "animal",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const text = args.join(" ");

      message.channel.send({
        content: this.bot.utils.codeContent(cowSay.say({ text, T: "U", e: "oO" })),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
