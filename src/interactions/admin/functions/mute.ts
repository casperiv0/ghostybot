import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function mute(
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
  const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;
  const time = interaction.options.getString("time");

  const member = await bot.utils.findMember(interaction, [user.id]);
  if (!member || member.permissions.has(DJS.Permissions.FLAGS.MANAGE_ROLES)) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.CAN_NOT_MUTED,
    });
  }

  const muteRole = await bot.utils.findOrCreateMutedRole(interaction.guild!);
  if (!muteRole) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  if (member?.roles.cache.find((r) => r.id === muteRole?.id)) {
    return interaction.reply({ ephemeral: true, content: lang.ADMIN.ALREADY_MUTED });
  }

  let content;
  let dmContent;
  if (time) {
    content = lang.ADMIN.SUCCES_MUTED.replace("{muteMemberTag}", user.tag)
      .replace("{time}", time)
      .replace("{reason}", reason);

    dmContent = lang.ADMIN.TEMP_MUTED.replace("{guildName}", interaction.guild!.name)
      .replace("{reason}", reason)
      .replace("{time}", time);
  } else {
    dmContent = lang.ADMIN.MUTE_SUCCESS_DM.replace("{guild}", interaction.guild!.name).replace(
      "{reason}",
      reason,
    );

    content = lang.ADMIN.MUTE_SUCCESS.replace("{tag}", user.tag).replace("{reason}", reason);
  }

  await interaction.reply({ content, ephemeral: true });
  await user.send({
    content: dmContent,
  });

  await bot.utils.updateMuteChannelPerms(interaction.guild!, user.id, {
    SEND_MESSAGES: false,
    ADD_REACTIONS: false,
    CONNECT: false,
  });
  await member.roles.add(muteRole);

  bot.emit("guildMuteAdd", interaction.guild, {
    member,
    executor: interaction.user,
    tempMute: !!time,
    reason,
    time,
  });
}
