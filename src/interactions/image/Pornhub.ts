import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class PornhubCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "pornhub",
      description: "Render an image as the Pornhub logo",
      options: [
        {
          name: "left-text",
          description: "The left text your want to render",
          required: true,
          type: DJS.ApplicationCommandOptionType.String,
        },
        {
          name: "right-text",
          description: "The right text your want to render",
          required: true,
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
    const leftText = interaction.options.getString("left-text", true);
    const rightText = interaction.options.getString("right-text", true);

    const url = new URL(this.APIs.Pornhub);
    url.searchParams.set("left", leftText);
    url.searchParams.set("right", rightText);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${url.toString()})`)
      .setImage(url.toString());

    await interaction.editReply({ embeds: [embed] });
  }
}
