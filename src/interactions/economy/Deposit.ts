import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class DepositCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "deposit",
      description: "Deposit money to your bank",
      options: [
        {
          description: "The amount you want to deposit",
          name: "amount",
          required: true,
          type: "NUMBER",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
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

    await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      bank: user.bank + Number(amount),
      money: user.money - Number(amount),
    });

    await interaction.reply({
      content: lang.ECONOMY.DEPOSITED_AMOUNT.replace("{amount}", `${amount}`),
    });
  }
}
