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

  async execute(bot: Bot, message: Message) {
    const guild = await bot.utils.getGuildById(message.guild?.id);

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle("Filters")
      .setDescription(
        `${filters.map((f) => `${f}`).join("\n")}\n **Use:** ${guild?.prefix}filter set <filter>`
      );

    return message.channel.send(embed);
  }
}
