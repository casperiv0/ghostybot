import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function rob(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = interaction.options.getUser("user", true);
  const amount = interaction.options.getNumber("amount", true);
  if (user.bot) {
    return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
  }

  if (user.id === interaction.user.id) {
    return interaction.reply({ ephemeral: true, content: lang.ECONOMY.CANNOT_ROB_SELF });
  }

  if (amount > 1000) {
    return interaction.reply({ ephemeral: true, content: lang.ECONOMY.BETWEEN_1_1000 });
  }

  if (amount < 0) {
    return interaction.reply({ content: lang.ECONOMY.BETWEEN_1_1000 });
  }

  const dbUser = await bot.utils.getUserById(user.id, interaction.guildId!);
  const robber = await bot.utils.getUserById(user.id, interaction.guildId!);

  if (!dbUser || !robber) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  if (dbUser.money <= 0) {
    return interaction.reply({ ephemeral: true, content: lang.ECONOMY.MEMBER_NO_MONEY });
  }

  await bot.utils.updateUserById(user.id, interaction.guildId!, {
    money: dbUser.money - amount,
  });
  await bot.utils.updateUserById(user.id, interaction.guildId!, {
    money: robber.money + Number(amount),
  });

  return interaction.reply({
    content: lang.ECONOMY.ROB_SUCCESS.replace("{amount}", `${amount}`).replace(
      "{member}",
      user.tag,
    ),
  });
}
