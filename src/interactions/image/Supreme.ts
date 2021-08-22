import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class SupremeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "supreme",
      description: "Display custom text as the Supreme logo",
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

  async execute(interaction: DJS.CommandInteraction) {
    await interaction.deferReply();

    const text = interaction.options.getString("text", true);

    const image = await this.bot.alexClient.image.supreme({
      text: encodeURIComponent(text),
    });

    const att = new DJS.MessageAttachment(image, "supreme.png");

    await interaction.editReply({ files: [att] });
  }
}
