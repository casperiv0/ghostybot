import { Message } from "discord.js";
import pkg from "@/package.json";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class DependenciesCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "dependencies",
      description: "Shows a list of all bots dependencies",
      category: "util",
      aliases: ["deps"],
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const dependencies = Object.entries(pkg.dependencies).join(",\n");

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.UTIL.DEPENDENCIES)
        .setDescription(dependencies);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
