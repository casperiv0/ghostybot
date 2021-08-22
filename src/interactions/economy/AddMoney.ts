import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class AddMoneyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "add-money",
      description: "Add money to a user",
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
      options: [
        {
          type: "USER",
          name: "user",
          description: "The user you want to add money to",
          required: true,
        },
        {
          type: "NUMBER",
          name: "amount",
          description: "The amount you want to add",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
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

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);
    if (!dbUser) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    await this.bot.utils.updateUserById(user.id, dbUser.guild_id, {
      bank: dbUser.bank + Number(amount),
    });

    await interaction.reply({
      content: lang.ECONOMY.ADDED_MONEY.replace("{amount}", amount.toString()),
    });
  }
}
