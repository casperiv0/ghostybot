import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DadJokeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "dadjoke",
      description: "Shows a dadjoke",
      category: "games",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://icanhazdadjoke.com/slack").then((res) => res.json());

      message.channel.send(data.attachments[0].fallback);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
