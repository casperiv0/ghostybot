import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RobCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "rob",
      description: "Rob up to 1000 coins from somebody",
      options: [
        {
          type: "USER",
          required: true,
          name: "user",
          description: "The user you want to rob",
        },
        {
          type: "NUMBER",
          required: true,
          name: "amount",
          description: "The amount you want to rob from the user",
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

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);
    const robber = await this.bot.utils.getUserById(user.id, interaction.guildId!);

    if (!dbUser || !robber) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    if (dbUser.money <= 0) {
      return interaction.reply({ ephemeral: true, content: lang.ECONOMY.MEMBER_NO_MONEY });
    }

    await this.bot.utils.updateUserById(user.id, interaction.guildId!, {
      money: dbUser.money - amount,
    });
    await this.bot.utils.updateUserById(user.id, interaction.guildId!, {
      money: robber.money + Number(amount),
    });

    await interaction.reply({
      content: lang.ECONOMY.ROB_SUCCESS.replace("{amount}", `${amount}`).replace(
        "{member}",
        user.tag,
      ),
    });
  }
}
