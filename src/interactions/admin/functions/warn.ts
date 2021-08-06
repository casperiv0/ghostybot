import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function warn(
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
  const user = interaction.options.getUser("user", true);
  const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;
  const member = await bot.utils.findMember(interaction, [user.id]);

  if (!member) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.PROVIDE_VALID_MEMBER,
    });
  }

  if (member.user.bot) {
    return interaction.reply({
      ephemeral: true,
      content: lang.MEMBER.BOT_DATA,
    });
  }

  if (member.permissions.has("MANAGE_MESSAGES")) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.USER_NOT_WARN,
    });
  }

  await bot.utils.addWarning(member.user.id, interaction.guildId!, reason);

  const warnings = await bot.utils.getUserWarnings(member.user.id, interaction.guildId!);

  return interaction.reply({
    content: lang.ADMIN.USER_WARNED.replace("{memberTag}", member.user.tag)
      .replace("{reason}", reason)
      .replace("{warningsTotal}", warnings ? `${warnings.length}` : "0"),
  });
}
