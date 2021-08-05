import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function unMute(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const perms = bot.utils.formatMemberPermissions(
    [DJS.Permissions.FLAGS.MANAGE_ROLES],
    interaction,
    lang,
  );
  if (perms) {
    return interaction.reply({ content: perms, ephemeral: true });
  }
  const botPerms = bot.utils.formatBotPermissions(
    [DJS.Permissions.FLAGS.MANAGE_ROLES, DJS.Permissions.FLAGS.MANAGE_CHANNELS],
    interaction,
    lang,
  );
  if (botPerms) {
    return interaction.reply({ embeds: [botPerms], ephemeral: true });
  }

  const user = interaction.options.getUser("user", true);

  const member = await bot.utils.findMember(interaction, [user.id]);
  const mutedRole = await bot.utils.findOrCreateMutedRole(interaction.guild!);
  if (!mutedRole) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  if (!member) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.PROVIDE_VALID_MEMBER,
    });
  }

  if (!member.roles.cache.some((r) => r.id === mutedRole?.id)) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.NOT_MUTED,
    });
  }

  interaction.guild?.channels.cache.forEach((channel) => {
    if (channel instanceof DJS.ThreadChannel) return;

    channel.permissionOverwrites.delete(member.id);
  });

  await bot.utils.updateUserById(user.id, interaction.guildId!, {
    mute: {
      reason: null,
      muted: false,
      ends_at: 0,
      time: null,
    },
  });

  interaction.reply({
    ephemeral: true,
    content: lang.ADMIN.SUC_UNMUTE.replace("{mutedMemberTag}", user.tag),
  });

  member.roles.remove(mutedRole);

  bot.emit("guildMuteRemove", interaction.guild, {
    member,
    executor: interaction.user,
  });
}
