import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class ImgfyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "imgfy",
      description: "text to image converter",
      options: [
        {
          name: "text",
          required: true,
          description: "The text that needs to be displayed",
          type: "STRING",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const text = interaction.options.getString("text", true);

    const image = `${this.APIs.Imgfy}${encodeURIComponent(text)}&_loc=generate&imageoutput=true`;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
      .setImage(image);

    await interaction.editReply({ embeds: [embed] });
  }
}
