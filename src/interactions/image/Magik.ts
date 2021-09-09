import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import fetch from "node-fetch";
import { SubCommand } from "structures/Command/SubCommand";

export default class MagikCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "magik",
      description: "Just Magik.",
      options: [
        {
          name: "user",
          description: "A user",
          type: "USER",
          required: false,
        },
        {
          name: "intensity",
          description: "The intensity of the Magik",
          type: "INTEGER",
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const user = interaction.options.getUser("user") ?? interaction.user;
    const intensity = interaction.options.getInteger("intensity") ?? Math.floor(Math.random() * 10);

    const data = (await fetch(
      `${this.APIs.Magik}${encodeURIComponent(intensity)}&image=${user?.displayAvatarURL({
        format: "png",
      })}`,
    ).then((res) => res.json())) as { message: string };

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
      .setImage(data.message);

    await interaction.editReply({ embeds: [embed] });
  }
}
