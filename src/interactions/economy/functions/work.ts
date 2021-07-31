import * as DJS from "discord.js";
import Bot from "structures/Bot";

import jobs from "assets/json/jobs.json";
import { time } from "@discordjs/builders";

export async function work(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const timeout = 3600000;

  const user = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
  if (!user) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const work = user.work;

  if (work !== null && timeout - (Date.now() - work) > 0) {
    const dateTime = new Date(Date.now() + timeout - (Date.now() - work));

    interaction.reply({
      ephemeral: true,
      content: `You have already worked recently. Check back ${time(dateTime, "R")}`,
    });
  } else {
    const { name, amount } = jobs[Math.floor(Math.random() * jobs.length)];

    const embed = bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.ECONOMY.WORK)
      .setDescription(
        `${lang.ECONOMY.WORKED.replace("{member}", interaction.user.username)
          .replace("{job_name}", name)
          .replace("{amount}", `${amount}`)} 💰`,
      );

    await interaction.reply({ ephemeral: true, embeds: [embed] });

    await bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      money: user.money + amount,
      work: Date.now(),
    });
  }
}
