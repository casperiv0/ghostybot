import { Message } from "discord.js";
import translate from "@iamtraction/google-translate";
import { Command } from "structures/Command";
import { Bot } from "structures/Bot";

export default class TranslateCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "translate",
      description: "Translate a sentence",
      usage: "<language> <sentence>",
      category: "util",
      requiredArgs: [{ name: "language" }, { name: "text" }],
      aliases: ["tr"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [to, ...sentence] = args;

      const result = await translate(sentence.join(" "), { to });

      const embed = this.bot.utils
        .baseEmbed(message)
        .setDescription(result.text)
        .setTitle(lang.UTIL.G_TRANSLATE);

      message.channel.send({ embeds: [embed] });
    } catch {
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
