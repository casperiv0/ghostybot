import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class BMICommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "bmi",
      description: "Calculate your body mass index",
      options: [
        {
          name: "height",
          required: true,
          description: "Your height in centimeters",
          type: DJS.ApplicationCommandOptionType.Number,
        },
        {
          name: "weight",
          required: true,
          description: "Your weight in kilograms",
          type: DJS.ApplicationCommandOptionType.Number,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const height = interaction.options.getNumber("height", true);
    const weight = interaction.options.getNumber("weight", true);

    const bmi = (+weight / ((+height * +height) / 10000)).toFixed(2);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.user.username} ${lang.UTIL.BMI}`)
      .addFields(
        { name: lang.UTIL.BMI_WEIGHT, value: `${weight}kg`, inline: true },
        {
          name: lang.UTIL.BMI_HEIGHT,
          value: `${height}cm`,
          inline: true,
        },
        { name: lang.UTIL.BMI, value: bmi },
      );

    await interaction.reply({ embeds: [embed] });
  }
}
