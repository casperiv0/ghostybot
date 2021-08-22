import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class PayCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "pay",
      description: "Give money to a user",
      options: [
        {
          type: "USER",
          required: true,
          name: "user",
          description: "The user you want to give money too",
        },
        {
          type: "NUMBER",
          required: true,
          name: "amount",
          description: "The amount you want to give to the user",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user", true);
    const amount = interaction.options.getNumber("amount", true);

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);
    if (!dbUser) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    if (user.bot) {
      return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
    }

    const receiver = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    const sender = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);

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

    await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      money: receiver.money + amount,
    });
    await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      money: sender.money - amount,
    });

    await interaction.reply({
      content: lang.ECONOMY.PAY_SUCCESS.replace("{member}", user.tag).replace(
        "{amount}",
        `${amount}`,
      ),
    });
  }
}
