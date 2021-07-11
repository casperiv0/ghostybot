import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";
import filters from "assets/json/filters.json";

export default class FiltersCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "filters",
      description: "All available filters",
      category: "music",
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const f = filters.join("\n");
      const guild = await this.bot.utils.getGuildById(message.guild?.id);

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle("Filters")
        .setDescription(`${f}\n\nUse: ${guild?.prefix}filter <filter>`);

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
