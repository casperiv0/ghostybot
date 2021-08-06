import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function compliment(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.deferReply();

  const { compliment } = await fetch("https://complimentr.com/api").then((res) => res.json());

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.GAMES.COMPLIMENT)
    .setDescription(compliment);

  await interaction.editReply({ embeds: [embed] });
}
