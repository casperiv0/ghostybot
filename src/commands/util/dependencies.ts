import { Message } from "discord.js";
import pkg from "../../../package.json";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DependenciesCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "dependencies",
      description: "Shows a list of all bots dependencies",
      category: "util",
      aliases: ["deps"]
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const dependencies = Object.entries(pkg.dependencies).join(",\n");
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.UTIL.DEPENDENCIES)
        .setDescription(dependencies);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
