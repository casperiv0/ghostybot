import { Message } from "discord.js";
import translate from "@k3rn31p4nic/google-translate-api";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

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

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const result = await translate(args.slice(1).join(" "), { to: args[0] });

      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(result.text)
        .setTitle(lang.UTIL.G_TRANSLATE);

      message.channel.send(embed);
    } catch {
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
