import { Message } from "discord.js";
import wd from "word-definition";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DefineCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "define",
      description: "Define a word",
      category: "util",
      requiredArgs: [{ name: "word" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const word = args[0];
      wd.getDef(word.toLowerCase(), "en", null, (data) => {
        if (data.err) {
          message.channel.send(lang.UTIL.NO_DEF_FOUND.replace("{word}", word));
        } else {
          const embed = bot.utils
            .baseEmbed(message)
            .setTitle(lang.UTIL.DEF_FOR_WORD.replace("{word}", word))
            .addField(lang.UTIL.CATEGORY, data.category)
            .addField(lang.UTIL.DEFINITION, data.definition);

          message.channel.send(embed);
        }
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
