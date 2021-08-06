import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function pay(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = interaction.options.getUser("user", true);
  const amount = interaction.options.getNumber("amount", true);

  const dbUser = await bot.utils.getUserById(user.id, interaction.guildId!);
  if (!dbUser) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  if (user.bot) {
    return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
  }

  const receiver = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
  const sender = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);

  if (!receiver || !sender) {
    return interaction.reply({ content: lang.GLOBAL.ERROR, ephemeral: true });
  }

  if (amount < 0) {
    return interaction.reply({
      content: lang.ECONOMY.MIN_AMOUNT,
      ephemeral: true,
    });
  }

  if (amount > sender.money) {
    return interaction.reply({
      content: lang.ECONOMY.NOT_ENOUGH_MONEY,
      ephemeral: true,
    });
  }

  if (receiver.user_id === sender.user_id) {
    return interaction.reply({
      content: lang.ECONOMY.CANNOT_PAY_SELF,
      ephemeral: true,
    });
  }

  await bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
    money: receiver.money + amount,
  });
  await bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
    money: sender.money - amount,
  });

  return interaction.reply({
    content: lang.ECONOMY.PAY_SUCCESS.replace("{member}", user.tag).replace(
      "{amount}",
      `${amount}`,
    ),
  });
}
