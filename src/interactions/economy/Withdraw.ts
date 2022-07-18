import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class WithdrawCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "withdraw",
      description: "Withdraw money to your bank",
      options: [
        {
          description: "The amount you want to withdraw",
          name: "amount",
          required: true,
          type: DJS.ApplicationCommandOptionType.Number,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
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

    await this.bot.utils.updateUserById(user.id, interaction.guildId!, {
      money: user.money + Number(amount),
      bank: user.bank - Number(amount),
    });

    await interaction.reply({
      content: this.bot.utils.translate(lang.ECONOMY.WITHDRAW_AMOUNT, { amount }),
    });
  }
}
