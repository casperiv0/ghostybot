import googleTranslate from "@iamtraction/google-translate";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function translate(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const language = interaction.options.getString("language", true);
  const sentence = interaction.options.getString("sentence", true);

  const result = await googleTranslate(sentence, { to: language });

  const embed = bot.utils
    .baseEmbed(interaction)
    .setDescription(result.text)
    .setTitle(lang.UTIL.G_TRANSLATE);

  await interaction.reply({ embeds: [embed] });
}
