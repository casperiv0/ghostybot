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

    const data = (await fetch(this.APIs.Compliment).then((res) => res.json())) as {
      compliment: string;
    };

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GAMES.COMPLIMENT)
      .setDescription(data.compliment);

    await interaction.editReply({ embeds: [embed] });
  }
}
