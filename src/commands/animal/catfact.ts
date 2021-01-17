import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CatFactCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "catfact",
      description: "Returns a cat fact",
      category: "animal",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      fetch("https://some-random-api.ml/facts/cat")
        .then((res) => res.json())
        .then((data) => {
          const fact = data.fact;
  
          const embed = bot.utils
            .baseEmbed(message)
            .setTitle(lang.ANIMAL.CAT_FACT)
            .setDescription(fact);
  
          message.channel.send(embed);
        });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
