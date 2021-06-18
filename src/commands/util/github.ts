import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class GitHubCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "github",
      description: "Search someone on github",
      category: "util",
      aliases: ["gh"],
      requiredArgs: [{ name: "username" }],
      typing: true,
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [username] = args;

      const url = `https://api.github.com/users/${encodeURIComponent(username)}`;
      const user = await fetch(url).then((res) => res.json());

      if (user?.message === "Not Found") {
        return message.channel.send({ content: lang.UTIL.GH_NOT_FOUND });
      }

      const twitter = user.twitter_username
        ? `[@${user.twitter_username}](https://twitter.com/${user.twitter_username})`
        : "N/A";
      const website = user.blog || "N/A";
      const location = user.location || "N/A";
      const bio = user.bio || "N/A";

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${user.login} ${lang.ECONOMY.PROFILE}`)
        .addField("**Twitter**", twitter, true)
        .addField(`**${lang.UTIL.GH_FOLLOWING}**`, user.following.toString(), true)
        .addField(`**${lang.UTIL.GH_FOLLOWERS}**`, user.followers.toString(), true)
        .addField(`**${lang.UTIL.GH_WEBSITE}**`, website, true)
        .addField(`**${lang.UTIL.GH_LOCATION}**`, location, true)
        .addField(`${lang.GLOBAL.URL}`, user.html_url)
        .setDescription(`${lang.UTIL.GH_BIO}: ${bio}`)
        .setThumbnail(user.avatar_url);

      if (user.name) {
        embed.setAuthor(user.name);
      }

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
