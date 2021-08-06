import { time } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function weekly(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
  if (!user) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const timeout = 60 * 60 * 1000 * 24 * 7; /* 1 week timeout */
  const amount = 1000;
  const weekly = user.weekly;

  if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
    const dateTime = new Date(Date.now() + timeout - (Date.now() - weekly));

    interaction.reply({
      ephemeral: true,
      content: lang.ECONOMY.WEEKLY_ERROR.replace("{time}", time(dateTime, "R")),
    });
  } else {
    bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      money: user.money + amount,
      weekly: Date.now(),
    });

    interaction.reply({
      ephemeral: true,
      content: lang.ECONOMY.WEEKLY_SUCCESS.replace("{amount}", `${amount}`),
    });
  }
}
