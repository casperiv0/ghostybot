import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class AmazingEarthCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "amazingearth",
      aliases: ["earthporn"],
      description: "Amazing images of light and landscape",
      category: "image",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
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
        .baseEmbed(message)
        .setTitle(`${title}`)
        .setURL(url)
        .setImage(image)
        .setFooter(`👍 ${upvotes} - 💬 ${comments}`);

      return message.channel.send(embed);
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
