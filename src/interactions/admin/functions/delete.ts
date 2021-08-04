import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function deleteMessages(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const perms = bot.utils.formatMemberPermissions(
    [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
    interaction,
    lang,
  );
  if (perms) {
    return interaction.reply({ content: perms, ephemeral: true });
  }

  const amount = interaction.options.getNumber("amount", true);

  if (amount < 1 || amount > 100) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.DELETE_PROVIDE_AMOUNT,
    });
  }

  await (interaction.channel as any)?.bulkDelete(amount);

  await interaction.reply({
    ephemeral: true,
    content: lang.ADMIN.DELETE_DELETED.replace("{amount}", amount.toString()),
  });
}
