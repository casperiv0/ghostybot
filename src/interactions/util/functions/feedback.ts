import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function feedback(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const feedback = interaction.options.getString("text", true);

  if (!process.env["FEEDBACK_CHANNEL_ID"]) {
    return interaction.reply({
      ephemeral: true,
      content:
        "Developer: This action cannot be performed since there's no channel defined (FEEDBACK_CHANNEL_ID)",
    });
  }

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.UTIL.NEW_FEEDBACK)
    .setDescription(feedback);

  const ch = bot.channels.cache.get(
    process.env["FEEDBACK_CHANNEL_ID"] as DJS.Snowflake,
  ) as DJS.TextChannel;

  await ch?.send({ embeds: [embed] });
  interaction.reply({ ephemeral: true, content: lang.UTIL.FEEDBACK_SEND });
}
