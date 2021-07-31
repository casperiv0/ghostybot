import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function ball8(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const answers = lang.OTHER.ANSWERS;

  const question = interaction.options.getString("question", true);
  const answer = answers[Math.floor(Math.random() * answers.length)];

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle("8Ball")
    .addField(`${lang.GAMES.QUESTION}:`, question)
    .addField(`${lang.GAMES.ANSWER}:`, answer);

  await interaction.reply({ embeds: [embed] });
}
