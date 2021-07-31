import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function deposit(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
  if (!user) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const amount = interaction.options.getNumber("amount", true);
  const money = user.money;

  if (+amount <= 0) {
    return interaction.reply({ ephemeral: true, content: lang.ECONOMY.MIN_AMOUNT });
  }

  if (money < +amount) {
    return interaction.reply({ ephemeral: true, content: lang.ECONOMY.NOT_ENOUGH_MONEY });
  }

  await bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
    bank: user.bank + Number(amount),
    money: user.money - Number(amount),
  });

  await interaction.reply({
    content: lang.ECONOMY.DEPOSITED_AMOUNT.replace("{amount}", `${amount}`),
  });
}
