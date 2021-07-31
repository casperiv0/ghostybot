import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function happiness(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const happiness = Math.floor(Math.random() * 100) + 1;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.GAMES.HAPPINESS)
    .setDescription(`${happiness}%`);

  await interaction.reply({ embeds: [embed] });
}
