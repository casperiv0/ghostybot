import * as DJS from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";

export async function tempRole(
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
    [DJS.Permissions.FLAGS.MANAGE_ROLES],
    interaction,
    lang,
  );
  if (botPerms) {
    return interaction.reply({ embeds: [botPerms], ephemeral: true });
  }

  const user = interaction.options.getUser("user", true);
  const role = interaction.options.getRole("role", true);
  const time = interaction.options.getString("time", true);
  const parsedRole = new DJS.Role(bot, role as any, interaction.guild!);

  const needsRole = await bot.utils.findMember(interaction, [user.id]);

  if (!needsRole) {
    return interaction.reply({
      ephemeral: true,
      content: lang.MEMBER.NOT_FOUND,
    });
  }

  if (interaction.guild!.me!.roles.highest.comparePositionTo(parsedRole) < 0) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name),
    });
  }

  if (interaction.guild!.me!.roles.highest.comparePositionTo(needsRole.roles.highest) < 0) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", needsRole.user.username),
    });
  }

  if (needsRole.roles.cache.some((r) => role.id === r.id)) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ROLES.ALREADY_HAS_ROLE,
    });
  }

  needsRole.roles.add(parsedRole);

  const dbUser = await bot.utils.getUserById(user.id, interaction.guildId!);

  await bot.utils.updateUserById(needsRole.user.id, interaction.guildId!, {
    temproles: {
      hasTempRoles: true,
      tempRoles: [
        ...(dbUser?.temproles.tempRoles ?? []),
        {
          roleId: role.id,
          ms: Date.now() + ms(time),
        },
      ],
    },
  });

  await interaction.reply({
    content: lang.ADMIN.ADDED_ROLE_TO.replace("{roleName}", role.name)
      .replace("{time}", time)
      .replace("{userTag}", needsRole.user.tag),
  });
}
