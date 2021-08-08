import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function bugReport(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const bug = interaction.options.getString("text", true);

  if (!process.env["BUG_REPORTS_CHANNEL_ID"]) {
    return interaction.reply({
      ephemeral: true,
      content:
        "Developer: This action cannot be performed since there's no channel defined (BUG_REPORTS_CHANNEL_ID)",
    });
  }

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.UTIL.BUG_REPORT.replace("{member}", interaction.user.tag))
    .setDescription(bug);

  const ch = bot.channels.cache.get(
    process.env["BUG_REPORTS_CHANNEL_ID"] as DJS.Snowflake,
  ) as DJS.TextChannel;

  await ch?.send({ embeds: [embed] });
  interaction.reply({ ephemeral: true, content: lang.UTIL.BUG_REPORTED });
}
