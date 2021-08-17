import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import fetch from "node-fetch";
import { SubCommand } from "structures/Command/SubCommand";

export default class ComplimentCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "compliment",
      description: "Get a compliment",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const { compliment } = await fetch("https://complimentr.com/api").then((res) => res.json());

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GAMES.COMPLIMENT)
      .setDescription(compliment);

    await interaction.editReply({ embeds: [embed] });
  }
}
