import { Message } from "discord.js";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

interface Field {
  name: string;
  value: string;
}

export default class EmojisCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "emojis",
      description: "Get a random color",
      category: "util",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    const nonAnimated: string[] = [];
    const animated: string[] = [];

    try {
      message.guild?.emojis.cache.forEach((e) => {
        if (e.animated) animated.push(e.toString());
        else nonAnimated.push(e.toString());
      });

      const embed = this.bot.utils.baseEmbed(message);
      const fields: Field[] = [];

      for (let i = 0; i < nonAnimated.length; i++) {
        if (i % 20 === 0) {
          const emojis = nonAnimated.slice(i, i + 20);

          fields.push({ name: lang.UTIL.NON_ANIMATED, value: emojis.join(" ") });
        }
      }

      for (let i = 0; i < animated.length; i++) {
        if (i % 20 === 0) {
          const emojis = animated.slice(i, i + 20);

          fields.push({ name: lang.UTIL.ANIMATED, value: emojis.join(" ") });
        }
      }

      embed.addFields(fields);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
