import * as DJS from "discord.js";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class MemeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "meme",
      description: "Returns a funny meme",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const data = (await fetch(this.APIs.Meme).then((res) => res.json())) as {
      title: string;
      url: string;
    };

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(data.title)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(data.url);

    await interaction.editReply({ embeds: [embed] });
  }
}
