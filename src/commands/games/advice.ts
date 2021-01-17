import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class AdviceCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "advice",
      description: "Gives you advice",
      category: "games",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://api.adviceslip.com/advice").then((res) => res.json());
  
      message.channel.send(data.slip.advice);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
