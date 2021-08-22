import * as DJS from "discord.js";
import { time } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

/** 1 week timeout */
const timeout = 60 * 60 * 1000 * 24 * 7;

export default class WeeklyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "weekly",
      description: "Claim your weekly",
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

    const amount = 1000;
    const weekly = user.weekly;

    if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
      const dateTime = new Date(Date.now() + timeout - (Date.now() - weekly));

      await interaction.reply({
        ephemeral: true,
        content: lang.ECONOMY.WEEKLY_ERROR.replace("{time}", time(dateTime, "R")),
      });
    } else {
      await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        money: user.money + amount,
        weekly: Date.now(),
      });

      await interaction.reply({
        ephemeral: true,
        content: lang.ECONOMY.WEEKLY_SUCCESS.replace("{amount}", `${amount}`),
      });
    }
  }
}
