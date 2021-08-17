import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class HappinessCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "happiness",
      description: "Get a happiness score returned",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const happiness = Math.floor(Math.random() * 100) + 1;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GAMES.HAPPINESS)
      .setDescription(`${happiness}%`);

    await interaction.reply({ embeds: [embed] });
  }
}
