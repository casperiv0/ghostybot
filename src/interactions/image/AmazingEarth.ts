import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import fetch from "node-fetch";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class AmazingEarthCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "image",
      name: "amazing-earth",
      description: "Amazing images of light and landscape",
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(interaction: DJS.CommandInteraction) {
    await interaction.deferReply();

    const data = await fetch("https://www.reddit.com/r/Earthporn/random/.json").then((res) =>
      res.json(),
    );

    const [children] = data[0].data.children;
    const permaLink = children.data.permalink;
    const url = `https://reddit.com${permaLink}`;
    const image = children.data.url;
    const title = children.data.title;
    const upvotes = children.data.ups;
    const comments = children.data.num_comments;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${title}`)
      .setURL(url)
      .setImage(image)
      .setFooter(`👍 ${upvotes} - 💬 ${comments}`);

    await interaction.editReply({ embeds: [embed] });
  }
}
