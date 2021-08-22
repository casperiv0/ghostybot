import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class HappinessCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "iq",
      description: "Get an IQ score returned",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const iq = Math.floor(Math.random() * 100) + 1;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GAMES.IQ_TEST)
      .setDescription(lang.GAMES.IQ_IS.replace("{iq}", `${iq}`));

    await interaction.reply({ embeds: [embed] });
  }
}
