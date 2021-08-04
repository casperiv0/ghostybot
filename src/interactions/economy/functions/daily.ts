import { time } from "@discordjs/builders";
import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function daily(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
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
    bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      daily: Date.now(),
      money: currentMoney + amount,
    });

    await interaction.reply({
      ephemeral: true,
      content: lang.ECONOMY.DAILY_SUCCESS.replace("{amount}", `${amount}`),
    });
  }
}
