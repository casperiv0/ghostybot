import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function removeMoney(
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

  const amount = interaction.options.getNumber("amount", true);
  const user = interaction.options.getUser("user", true);
  if (user.bot) {
    return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
  }

  if (amount < 1) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ECONOMY.MIN_AMOUNT,
    });
  }

  const dbUser = await bot.utils.getUserById(user.id, interaction.guildId!);
  if (!dbUser) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  await bot.utils.updateUserById(user.id, dbUser.guild_id, {
    bank: dbUser.bank - Number(amount),
  });

  return interaction.reply({
    content: lang.ECONOMY.REMOVED_MONEY.replace("{amount}", amount.toString()),
  });
}
