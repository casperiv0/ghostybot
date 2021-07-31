import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function iq(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const iq = Math.floor(Math.random() * 100) + 1;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.GAMES.IQ_TEST)
    .setDescription(lang.GAMES.IQ_IS.replace("{iq}", `${iq}`));

  await interaction.reply({ embeds: [embed] });
}
