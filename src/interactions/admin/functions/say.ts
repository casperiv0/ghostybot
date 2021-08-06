import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function say(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const perms = bot.utils.formatMemberPermissions(
    [DJS.Permissions.FLAGS.MANAGE_GUILD],
    interaction,
    lang,
  );
  if (perms) {
    return interaction.reply({ content: perms, ephemeral: true });
  }

  const embed = interaction.options.getBoolean("embed");
  const text = interaction.options.getString("text", true);

  if (embed) {
    const embed = bot.utils.baseEmbed(interaction).setDescription(text);
    return interaction.reply({ embeds: [embed] });
  }

  return interaction.reply({ content: text });
}
