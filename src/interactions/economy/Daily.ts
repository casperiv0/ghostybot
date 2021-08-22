import * as DJS from "discord.js";
import { time } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class DailyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "daily",
      description: "Claim your daily",
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

    const timeout = 60 * 60 * 24 * 1000; /* 24h timeout */
    const amount = 500;
    const currentMoney = user?.money;
    const daily = user?.daily;

    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      const dateTime = new Date(Date.now() + timeout - (Date.now() - daily));

      await interaction.reply({
        ephemeral: true,
        content: lang.ECONOMY.DAILY_ERROR.replace("{time}", time(dateTime, "R")),
      });
    } else {
      this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        daily: Date.now(),
        money: currentMoney + amount,
      });

      await interaction.reply({
        ephemeral: true,
        content: lang.ECONOMY.DAILY_SUCCESS.replace("{amount}", `${amount}`),
      });
    }
  }
}
