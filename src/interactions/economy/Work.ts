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
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
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
        content: this.bot.utils.translate(lang.ECONOMY.ALREADY_WORKED, {
          time: time(dateTime, "R"),
        }),
      });
    } else {
      const { name, amount } = jobs[Math.floor(Math.random() * jobs.length)];

      const embed = this.bot.utils
        .baseEmbed(interaction)
        .setTitle(lang.ECONOMY.WORK)
        .setDescription(
          `${this.bot.utils.translate(lang.ECONOMY.WORKED, {
            member: interaction.user.username,
            job_name: name,
            amount,
          })} 💰`,
        );

      await interaction.reply({ ephemeral: true, embeds: [embed] });

      await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        money: user.money + amount,
        work: Date.now(),
      });
    }
  }
}
