import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class DadJokeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "dadjoke",
      description: "Shows a dadjoke",
      category: "games",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://icanhazdadjoke.com/slack").then((res) => res.json());

      return message.channel.send({ content: data.attachments[0].fallback });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
