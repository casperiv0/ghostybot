import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { request } from "undici";
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
          type: DJS.ApplicationCommandOptionType.String,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const text = interaction.options.getString("text", true);

    const data = (await request(`${this.APIs.Clyde}${encodeURIComponent(text)}`).then((res) =>
      res.body.json(),
    )) as { message: string };

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.IMAGE.CLYDE)
      .setImage(data.message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`);

    await interaction.editReply({ embeds: [embed] });
  }
}
