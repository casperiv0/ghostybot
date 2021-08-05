import WarningModel from "@/src/models/Warning.model";
import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function removeWarning(
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
  const id = interaction.options.getNumber("warning-id", true);

  if (user.bot) {
    return interaction.reply({
      ephemeral: true,
      content: lang.MEMBER.BOT_DATA,
    });
  }

  await interaction.defer({ ephemeral: true });

  const warnings = await bot.utils.getUserWarnings(user.id, interaction.guildId!);

  if (!warnings[0]) {
    return interaction.reply({
      content: lang.ADMIN.NO_WARNINGS,
    });
  }

  const warning = warnings[id - 1];

  if (!warning) {
    return interaction.editReply({
      content: "That warning was not found",
    });
  }

  await WarningModel.findByIdAndDelete(warning._id).catch(() => null);

  return interaction.editReply({ content: lang.ADMIN.REMOVED_ALL_WARNINGS });
}
