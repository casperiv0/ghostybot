import * as DJS from "discord.js";
import { time } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import jobs from "assets/json/jobs.json";

/** 1 hour timeout */
const timeout = 60 * 60 * 1000;

export default class WorkCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "work",
      description: "Work!",
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

    const work = user.work;

    if (work !== null && timeout - (Date.now() - work) > 0) {
      const dateTime = new Date(Date.now() + timeout - (Date.now() - work));

      await interaction.reply({
        ephemeral: true,
        content: lang.ECONOMY.ALREADY_WORKED.replace("{time}", time(dateTime, "R")),
      });
    } else {
      const { name, amount } = jobs[Math.floor(Math.random() * jobs.length)];

      const embed = this.bot.utils
        .baseEmbed(interaction)
        .setTitle(lang.ECONOMY.WORK)
        .setDescription(
          `${lang.ECONOMY.WORKED.replace("{member}", interaction.user.username)
            .replace("{job_name}", name)
            .replace("{amount}", `${amount}`)} 💰`,
        );

      await interaction.reply({ ephemeral: true, embeds: [embed] });

      await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        money: user.money + amount,
        work: Date.now(),
      });
    }
  }
}
