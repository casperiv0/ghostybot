import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function lockChannel(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const perms = bot.utils.formatMemberPermissions(
    [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
    interaction,
    lang,
  );
  if (perms) {
    return interaction.reply({ content: perms, ephemeral: true });
  }

  const botPerms = bot.utils.formatBotPermissions(
    [DJS.Permissions.FLAGS.MANAGE_CHANNELS],
    interaction,
    lang,
  );
  if (botPerms) {
    return interaction.reply({ embeds: [botPerms], ephemeral: true });
  }

  const reason = interaction.options.getString("reason", true);
  const channel = interaction.channel as DJS.TextChannel;

  if (!channel?.permissionsFor(interaction.guildId!)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.CHANNEL_ALREADY_LOCKED,
    });
  }

  await channel.permissionOverwrites.create(interaction.guildId!, {
    SEND_MESSAGES: false,
  });

  await interaction.reply({
    content: lang.ADMIN.LOCKED_CHANNEL_REASON.replace("{channel}", `${channel}`).replace(
      "{lockReason}",
      reason,
    ),
  });
}
