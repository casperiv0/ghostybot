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
          type: "NUMBER",
        },
        {
          name: "weight",
          required: true,
          description: "Your weight in kilograms",
          type: "NUMBER",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const height = interaction.options.getNumber("height", true);
    const weight = interaction.options.getNumber("weight", true);

    const bmi = (+weight / ((+height * +height) / 10000)).toFixed(2);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.user.username} ${lang.UTIL.BMI}`)
      .addField(`${lang.UTIL.BMI_WEIGHT}`, `${weight}kg`, true)
      .addField(`${lang.UTIL.BMI_HEIGHT}`, `${height}cm`, true)
      .addField(`${lang.UTIL.BMI}`, bmi);

    await interaction.reply({ embeds: [embed] });
  }
}
