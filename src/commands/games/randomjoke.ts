import { Message } from "discord.js";
import { getRandomJoke } from "one-liner-joke";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class JokeCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "randomjoke",
      description: "returns a random joke",
      category: "games",
      aliases: ["joke"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      message.channel.send(
        getRandomJoke({ exclude_tags: ["dirty", "racist", "marriage", "sex", "death"] }).body
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
