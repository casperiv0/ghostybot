import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import ms from "ms";

export default class SpotifyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "spotify",
      description: "Find a track/artist/album via the Spotify API",
      category: "util",
      requiredArgs: [{ name: "track/artist/albmum" }, { name: "search query" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const [type, ...rest] = args;
      const search = encodeURIComponent(rest.join());

      const url = `http://api.xaliks.xyz/info/spotify/${type}/${search}`;

      const data = await fetch(url).then((res) => res.json());

      switch (type) {
        case "track": {
          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(data.name)
            .setURL(data.url)
            .addField(lang.MUSIC.DURATION, `about ${ms(data.duration, { long: true })}`);

          return message.channel.send(embed);
        }
        case "artist": {
          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(data.name)
            .setURL(data.url)
            .addField(lang.UTIL.GH_FOLLOWERS, this.bot.utils.formatNumber(data.followers))
            .setImage(data.images[0].url);

          return message.channel.send(embed);
        }
        case "album": {
          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(data.name)
            .setURL(data.url)
            .addField(lang.UTIL.TOTAL_TRACKS, this.bot.utils.formatNumber(data.totalTracks), true)
            .addField(lang.UTIL.RELEASE_DATE, data.releaseDate, true)
            .setImage(data.images[0].url);

          return message.channel.send(embed);
        }
        default: {
          return message.channel.send("Invalid type");
        }
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
