import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import filters from "../../data/filters.json";

export default class FiltersCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "filters",
      description: "All music filters",
      category: "music",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const guild = await this.bot.utils.getGuildById(message.guild?.id);

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle("Filters")
        .setDescription(
          `${filters.map((f) => `${f}`).join("\n")}\n **Use:** ${guild?.prefix}filter set <filter>`,
        );

      return message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
