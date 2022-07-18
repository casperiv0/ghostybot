import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class HugCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "anime",
      name: "hug",
      description: "Shows a picture of people hugging",
      options: [
        {
          name: "user",
          description: "A user",
          type: DJS.ApplicationCommandOptionType.User,
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user") ?? interaction.user;
    const hugged = interaction.user.id === user.id ? "themselves" : user.username;

    const data = await this.bot.neko.hug();
    const link = hyperlink(lang.IMAGE.CLICK_TO_VIEW, data.url);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.user.username} ${lang.IMAGE.HUGGED} ${hugged}`)
      .setDescription(link)
      .setImage(data.url);

    await interaction.reply({ embeds: [embed] });
  }
}
