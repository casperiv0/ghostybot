import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function kick(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const perms = bot.utils.formatMemberPermissions(
    [DJS.Permissions.FLAGS.KICK_MEMBERS],
    interaction,
    lang,
  );
  if (perms) {
    return interaction.reply({ content: perms, ephemeral: true });
  }

  const botPerms = bot.utils.formatBotPermissions(
    [DJS.Permissions.FLAGS.KICK_MEMBERS],
    interaction,
    lang,
  );
  if (botPerms) {
    return interaction.reply({ embeds: [botPerms], ephemeral: true });
  }

  const user = interaction.options.getUser("user", true);
  const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;

  const member = await bot.utils.findMember(interaction, [user.id]);

  if (!member || !kickable(member)) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.KICK_CANNOT_KICK,
    });
  }

  if (interaction.guild!.me!.roles.highest.comparePositionTo(member.roles.highest) < 0) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", user.tag),
    });
  }

  await member.kick(reason);

  try {
    await user.send({
      content: lang.ADMIN.KICK_SUCCESS_DM.replace("{guild_name}", interaction.guild?.name!).replace(
        "{ban_reason}",
        reason,
      ),
    });
    // eslint-disable-next-line no-empty
  } catch {}

  interaction.reply({
    ephemeral: true,
    content: lang.ADMIN.KICK_SUCCESS.replace("{tag}", user.tag).replace("{reason}", reason),
  });

  bot.emit("guildKickAdd", interaction.guild, {
    member,
    executor: interaction.user,
    reason,
  });
}

function kickable(member: DJS.GuildMember) {
  if (member.kickable) return true;

  if (member.permissions.has(DJS.Permissions.FLAGS.KICK_MEMBERS)) return false;
  if (member.permissions.has(DJS.Permissions.FLAGS.ADMINISTRATOR)) return false;

  return true;
}
