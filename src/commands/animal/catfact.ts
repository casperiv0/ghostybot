import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class CatFactCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "catfact",
      description: "Returns a cat fact",
      category: "animal",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      fetch("https://some-random-api.ml/facts/cat")
        .then((res) => res.json())
        .then((data) => {
          const fact = data.fact;

          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(lang.ANIMAL.CAT_FACT)
            .setDescription(fact);

          return message.channel.send({ embeds: [embed] });
        })
        .catch((err) => {
          this.bot.utils.sendErrorLog(err, "error");
          return message.channel.send({ content: lang.GLOBAL.ERROR });
        });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
