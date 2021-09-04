import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import fetch from "node-fetch";
import { SubCommand } from "structures/Command/SubCommand";

export default class FoodpornCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "foodporn",
      description: "Shows Food images",
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    await interaction.deferReply();

    const data = (await fetch(this.APIs.FoodPorn).then((res) => res.json())) as any;

    const [children] = data[0].data.children;
    const permaLink = children.data.permalink;
    const url = `https://reddit.com${permaLink}`;
    const image = children.data.url;
    const title = children.data.title;
    const upvotes = children.data.ups;
    const comments = children.data.num_comments;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(title)
      .setURL(url)
      .setImage(image)
      .setFooter(`👍: ${upvotes} -  💬: ${comments}`);

    await interaction.editReply({ embeds: [embed] });
  }
}
