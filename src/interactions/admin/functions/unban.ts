import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function unban(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const perms = bot.utils.formatMemberPermissions(
    [DJS.Permissions.FLAGS.BAN_MEMBERS],
    interaction,
    lang,
  );
  if (perms) {
    return interaction.reply({ content: perms, ephemeral: true });
  }

  const botPerms = bot.utils.formatBotPermissions(
    [DJS.Permissions.FLAGS.BAN_MEMBERS],
    interaction,
    lang,
  );
  if (botPerms) {
    return interaction.reply({ embeds: [botPerms], ephemeral: true });
  }

  const userId = interaction.options.getString("user-id", true);

  const bannedUser = await interaction.guild?.members.unban(userId as DJS.Snowflake);

  await interaction.reply({
    ephemeral: true,
    content: lang.ADMIN.SUC_UNBAN.replace("{bannedUsername}", `${bannedUser?.username}`),
  });
}
