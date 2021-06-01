import { Message } from "discord.js";
import fetch from "node-fetch";
import ms from "ms";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class SpotifyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "spotify",
      description: "Find a track/artist/album via the Spotify API",
      category: "util",
      requiredArgs: [{ name: "track/artist/album" }, { name: "search query" }],
      aliases: ["spot"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const [type, ...rest] = args;
      const search = encodeURIComponent(rest.join());

      if (!["track", "artist", "album"].includes(type.toLowerCase())) {
        return message.channel.send("Invalid type");
      }

      const url = `http://api.xaliks.xyz/info/spotify/${type}/${search}`;
      const data = await fetch(url).then((res) => res.json());

      switch (type.toLowerCase()) {
        case "track": {
          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(data.name)
            .setURL(data.url)
            .addField(lang.MUSIC.DURATION, `about ${ms(data.duration, { long: true })}`);

          if (data.album?.found === true) {
            embed.addField(
              "Album",
              `
**Name:** [${data.album.name}](${data.album.url})
**${lang.UTIL.RELEASE_DATE}:** ${data.album.releaseDate}`,
            );
          }

          return message.channel.send(embed);
        }
        case "artist": {
          const topTracks = data.top10tracks.map((v) => `[${v.name}](${v.url})`).join("\n");

          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(data.name)
            .setURL(data.url)
            .addField(lang.UTIL.GH_FOLLOWERS, this.bot.utils.formatNumber(data.followers))
            .addField("Top 10 tracks", topTracks)
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
