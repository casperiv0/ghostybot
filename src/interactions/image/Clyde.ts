import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import fetch from "node-fetch";
import { SubCommand } from "structures/Command/SubCommand";

export default class ClydeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "clyde",
      description: "Let clyde say something",
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

    const data = (await fetch(`${this.APIs.Clyde}${encodeURIComponent(text)}`).then((res) =>
      res.json(),
    )) as { message: string };

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.IMAGE.CLYDE)
      .setImage(data.message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`);

    await interaction.editReply({ embeds: [embed] });
  }
}
