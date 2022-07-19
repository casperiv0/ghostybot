import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class BalanceCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "balance",
      description: "See the balance of a user",
      options: [
        {
          type: DJS.ApplicationCommandOptionType.User,
          required: false,
          name: "user",
          description: "The user you want to see their balance of",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user") ?? interaction.user;

    if (user.bot) {
      return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
    }

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);
    if (!dbUser) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${user.username} ${lang.ECONOMY.BALANCE}`)
      .addFields(
        {
          name: lang.ECONOMY.MONEY,
          value: this.bot.utils.formatNumber(dbUser.money),
          inline: true,
        },
        { name: lang.ECONOMY.BANK, value: this.bot.utils.formatNumber(dbUser.bank), inline: true },
        {
          name: lang.COVID.TOTAL,
          value: this.bot.utils.formatNumber(dbUser.bank + dbUser.money),
          inline: true,
        },
      );

    await interaction.reply({ embeds: [embed] });
  }
}
