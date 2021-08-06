import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function warnings(
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
  const id = interaction.options.getNumber("warning-id");

  if (user.bot) {
    return interaction.reply({
      ephemeral: true,
      content: lang.MEMBER.BOT_DATA,
    });
  }

  const warnings = await bot.utils.getUserWarnings(user.id, interaction.guildId!);

  const embed = bot.utils.baseEmbed(interaction);

  if (id) {
    const warning = warnings[id - 1];

    if (!warning) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.WARN_NOT_FOUND.replace("{memberTag}", user.tag),
      });
    }

    const warnedOn = warning?.date ? new Date(warning?.date)?.toLocaleString() : "N/A";
    embed
      .setTitle(`${lang.ADMIN.WARNING} ${id}`)
      .addField(`**${lang.EVENTS.REASON}**`, warning?.reason || lang.GLOBAL.NOT_SPECIFIED)
      .addField(`**${lang.ADMIN.WARNED_ON}**`, warnedOn);

    return interaction.reply({ ephemeral: true, embeds: [embed] });
  }

  embed
    .setTitle(lang.ADMIN.MEMBER_WARNS.replace("{memberTag}", user.tag))
    .addField(`**${lang.ADMIN.TOTAL_WARNS}**`, (warnings?.length || 0).toString())
    .setThumbnail(user.displayAvatarURL({ dynamic: true }));

  return interaction.reply({ ephemeral: true, embeds: [embed] });
}
