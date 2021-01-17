import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DogFactCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "dogfact",
      description: "Returns a dog fact",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      fetch("https://some-random-api.ml/facts/dog")
        .then((res) => res.json())
        .then((data) => {
          const fact = data.fact;
  
          const embed = bot.utils
            .baseEmbed(message)
            .setTitle(lang.ANIMAL.DOG_FACT)
            .setDescription(fact);
  
          message.channel.send(embed);
        });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
