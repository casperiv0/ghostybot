import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class PokeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "anime",
      name: "poke",
      description: "Poke somebody",
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
    const poked = interaction.user.id === user.id ? "themselves" : user.username;

    const data = await this.bot.neko.poke();
    const link = hyperlink(lang.IMAGE.CLICK_TO_VIEW, data.url);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.user.username} ${lang.IMAGE.POKED} ${poked}`)
      .setDescription(link)
      .setImage(data.url);

    await interaction.reply({ embeds: [embed] });
  }
}
