import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class CuddleCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "anime",
      name: "cuddle",
      description: "Cuddle with somebody",
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
    const cuddled = interaction.user.id === user.id ? "themselves" : user.username;

    const data = await this.bot.neko.cuddle();
    const link = hyperlink(lang.IMAGE.CLICK_TO_VIEW, data.url);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.user.username} ${lang.IMAGE.CUDDLES} ${cuddled}`)
      .setDescription(link)
      .setImage(data.url);

    await interaction.reply({ embeds: [embed] });
  }
}
