import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class AchievementCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "achievement",
      description: "Render a Minecraft achievement",
      options: [
        {
          name: "text",
          description: "The text your want to render in the achievement",
          required: true,
          type: DJS.ApplicationCommandOptionType.String,
        },
        {
          name: "icon",
          description: "An icon number from 1 to 45",
          required: false,
          type: DJS.ApplicationCommandOptionType.Integer,
        },
        {
          name: "title",
          description: "The title of the achievement",
          required: false,
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
    const iconNr = interaction.options.getInteger("icon");
    const title = interaction.options.getString("title");

    const url = new URL(this.APIs.Achievement);
    url.searchParams.set("text", text);
    iconNr && url.searchParams.set("icon", String(iconNr));
    title && url.searchParams.set("title", title);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${url.toString()})`)
      .setImage(url.toString());

    await interaction.editReply({ embeds: [embed] });
  }
}
