import * as DJS from "discord.js";
import { bold } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class ProfileCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "profile",
      description: "See the profile of a user",
      options: [
        {
          type: "USER",
          required: false,
          name: "user",
          description: "The user you want to see their profile of",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
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

    const { money, bank, inventory, xp } = dbUser;
    const level = this.bot.utils.calculateXp(xp);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${user.username} ${lang.ECONOMY.PROFILE}`)
      .setDescription(
        `
  ${bold(lang.LEVELS.XP)}: ${this.bot.utils.formatNumber(xp)}
  ${bold(lang.LEVELS.LEVEL)}: ${level}
  ${bold(lang.ECONOMY.MONEY)}: ${this.bot.utils.formatNumber(money)}
  ${bold(lang.ECONOMY.BANK)}: ${this.bot.utils.formatNumber(bank)}
      `,
      )
      .addField(bold(lang.ECONOMY.INV_ITEMS), inventory.length.toString(), true);

    await interaction.reply({ embeds: [embed] });
  }
}
