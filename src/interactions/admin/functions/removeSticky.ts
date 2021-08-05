import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function removeSticky(
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

  const botPerms = bot.utils.formatBotPermissions(
    [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
    interaction,
    lang,
  );
  if (botPerms) {
    return interaction.reply({ embeds: [botPerms], ephemeral: true });
  }

  await bot.utils.removeSticky(interaction.channelId);

  await interaction.reply({
    ephemeral: true,
    content: lang.ADMIN.STICKY_CLEAR.replace("{channel}", `${interaction.channel}`),
  });
}
