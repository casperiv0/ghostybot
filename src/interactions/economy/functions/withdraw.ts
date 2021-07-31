import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function withdraw(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
  if (!user) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const bank = user.bank;
  const amount = interaction.options.getNumber("amount", true);

  if (amount < 0) {
    return interaction.reply({ ephemeral: true, content: lang.ECONOMY.MIN_AMOUNT });
  }

  if (bank < amount) {
    return interaction.reply({ ephemeral: true, content: lang.ECONOMY.NO_MONEY });
  }

  await bot.utils.updateUserById(user.id, interaction.guildId!, {
    money: user.money + Number(amount),
    bank: user.bank - Number(amount),
  });
  interaction.reply({
    content: lang.ECONOMY.WITHDRAW_AMOUNT.replace("{amount}", `${amount}`),
  });
}
