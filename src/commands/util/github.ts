import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class GitHubCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "github",
      description: "Search someone on github",
      category: "util",
      aliases: ["gh"],
      requiredArgs: [{ name: "username" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const username = args[0];

      if (!username) {
        return message.channel.send(lang.UTIL.GH_PROVIDE_USERNAME);
      }

      const msg = await message.channel.send(`${lang.UTIL.SEARCHING}..`);
      const url = `https://api.github.com/users/${username}`;
      const result = await fetch(url).then((res) => res.json());
      const user = result;

      if (user?.message === "Not Found") {
        return message.channel.send(lang.UTIL.GH_NOT_FOUND).then(() => msg.delete());
      }

      msg.deletable && msg.delete();

      const twitter = user.twitter_username
        ? `[@${user.twitter_username}](https://twitter.com/${user.twitter_username})`
        : "N/A";
      const website = user.blog ? user.blog : "N/A";
      const location = user.location ? user.location : "N/A";
      const bio = user.bio ? user.bio : "N/A";

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${user.login} ${lang.ECONOMY.PROFILE}`)
        .addField("**Twitter**", twitter, true)
        .addField(`**${lang.UTIL.GH_FOLLOWING}**`, user.following, true)
        .addField(`**${lang.UTIL.GH_FOLLOWERS}**`, user.followers, true)
        .addField(`**${lang.UTIL.GH_WEBSITE}**`, website, true)
        .addField(`**${lang.UTIL.GH_LOCATION}**`, location, true)
        .addField(`${lang.GLOBAL.URL}`, user.html_url)
        .setDescription(`${lang.UTIL.GH_BIO}: ${bio}`)
        .setThumbnail(user.avatar_url);

      if (user.name) {
        embed.setAuthor(user.name);
      }

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
