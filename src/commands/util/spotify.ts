import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class SpotifyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "spotify",
      description: "Find a track/artist/album via the Spotify API",
      category: "util",
      requiredArgs: [{ name: "track/artist/album/playlist" }, { name: "search query" }],
      aliases: ["spot"],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const [type, ...rest] = args;
      const search = encodeURIComponent(rest.join());

      if (!["track", "artist", "album", "playlist"].includes(type.toLowerCase())) {
        return message.channel.send({ content: "Invalid type" });
      }

      const url = `http://api.xaliks.xyz/info/spotify?type=${type}&query=${search}`;
      const data = await fetch(url).then((res) => res.json());

      if (data.error) {
        return message.channel.send({
          content: data.error,
        });
      }

      switch (type.toLowerCase()) {
        case "track": {
          const artists =
            data.album.artists.map((art) => `[${art.name}](${art.url})`).join(", ") ||
            lang.GLOBAL.NONE;

          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(data.name)
            .setURL(data.url)
            .setThumbnail(data.album.images[0].url)
            .addField(lang.MUSIC.DURATION, data.duration)
            .addField(
              "Album",
              `
**Name:** [${data.album.name}](${data.album.url})
**${lang.UTIL.RELEASE_DATE}:** ${data.album.release_date}
**Artists:** ${artists}`,
            );

          return message.channel.send({ embeds: [embed] });
        }
        case "artist": {
          const topTracks =
            data.top10tracks?.map((v) => `[${v.name}](${v.url})`)?.join("\n") || lang.GLOBAL.NONE;
          const genres = data.genres?.join("\n") || lang.GLOBAL.NONE;

          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(data.name)
            .setURL(data.url)
            .addField(lang.UTIL.GH_FOLLOWERS, this.bot.utils.formatNumber(data.followers), true)
            .addField("Genres", genres, true)
            .addField("Top 10 tracks", topTracks);

          if (data.images.length > 0) {
            embed.setImage(data.images[0].url);
          }

          return message.channel.send({ embeds: [embed] });
        }
        case "album": {
          const tracks =
            data.tracks.map((v) => `[${v.name}](${v.url})`).join("\n") || lang.GLOBAL.NONE;
          const artists =
            data.artists.map((art) => `[${art.name}](${art.url})`).join(", ") || lang.GLOBAL.NONE;

          const embed = this.bot.utils
            .baseEmbed(message)
            .setTitle(data.name)
            .setURL(data.url)
            .addField(lang.UTIL.TOTAL_TRACKS, this.bot.utils.formatNumber(data.total_tracks), true)
            .addField("Tracks", tracks, true)
            .addField(lang.UTIL.RELEASE_DATE, data.release_date, true)
            .addField("Artists", artists, true)
            .setImage(data.images[0].url);

          return message.channel.send({ embeds: [embed] });
        }
        case "playlist": {
          const length = data.tracks.length <= 10 ? "" : `${data.tracks.length - 10} more tracks`;

          const tracks =
            (data.tracks as any[])
              .map((v) => `[${v.name}](${v.url})`)
              .slice(0, 10)
              .join("\n") || lang.GLOBAL.NONE;

          const embed = this.bot.utils
            .baseEmbed(message)
            .setDescription(data.description || "No description")
            .setTitle(data.name)
            .setURL(data.url)
            .addField(lang.UTIL.TOTAL_TRACKS, this.bot.utils.formatNumber(data.total_tracks), true)
            .addField("Tracks", `${tracks}\n${length}`, true)
            .setImage(data.images[0].url);

          return message.channel.send({ embeds: [embed] });
        }
        default: {
          return message.channel.send({ content: "Invalid type" });
        }
      }
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
