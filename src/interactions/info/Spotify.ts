import * as DJS from "discord.js";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class SpotifyInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "spotify",
      description: "Find a track/artist/album via the Spotify API",
      options: [
        {
          name: "type",
          type: "STRING",
          description: "The type you want to search for",
          required: true,
          choices: [
            {
              name: "Album",
              value: "album",
            },
            {
              name: "Artist",
              value: "artist",
            },
            {
              name: "Playlist",
              value: "playlist",
            },
            {
              name: "Track",
              value: "track",
            },
          ],
        },
        {
          name: "query",
          description: "The search query",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const type = interaction.options.getString("type", true) as
      | "track"
      | "artist"
      | "album"
      | "playlist";
    const query = interaction.options.getString("query", true);

    const url = `http://api.xaliks.xyz/info/spotify?type=${type}&query=${encodeURIComponent(
      query,
    )}`;
    const data = (await fetch(url).then((res) => res.json())) as any;

    if (data.error) {
      return interaction.editReply({
        content: data.error,
      });
    }

    switch (type.toLowerCase()) {
      case "track": {
        const artists =
          data.album.artists.map((art) => `[${art.name}](${art.url})`).join(", ") ||
          lang.GLOBAL.NONE;

        const embed = this.bot.utils
          .baseEmbed(interaction)
          .setTitle(data.name)
          .setURL(data.url)
          .setThumbnail(data.album.images[0].url)
          .addField(lang.MUSIC.DURATION, data.duration)
          .addField(
            lang.UTIL.SPOT_ALBUM,
            `
  **${lang.GLOBAL.NAME}:** [${data.album.name}](${data.album.url})
  **${lang.UTIL.RELEASE_DATE}:** ${data.album.release_date}
  **${lang.UTIL.SPOT_ARTISTS}:** ${artists}`,
          );

        return interaction.editReply({ embeds: [embed] });
      }
      case "artist": {
        const topTracks =
          data.top10tracks?.map((v) => `[${v.name}](${v.url})`)?.join("\n") || lang.GLOBAL.NONE;
        const genres = data.genres?.join("\n") || lang.GLOBAL.NONE;

        const embed = this.bot.utils
          .baseEmbed(interaction)
          .setTitle(data.name)
          .setURL(data.url)
          .addField(lang.UTIL.GH_FOLLOWERS, this.bot.utils.formatNumber(data.followers), true)
          .addField(lang.UTIL.SPOT_GENRES, genres, true)
          .addField(lang.UTIL.SPOT_TOP, topTracks);

        if (data.images.length > 0) {
          embed.setImage(data.images[0].url);
        }

        return interaction.editReply({ embeds: [embed] });
      }
      case "album": {
        const tracks =
          data.tracks.map((v) => `[${v.name}](${v.url})`).join("\n") || lang.GLOBAL.NONE;
        const artists =
          data.artists.map((art) => `[${art.name}](${art.url})`).join(", ") || lang.GLOBAL.NONE;

        const embed = this.bot.utils
          .baseEmbed(interaction)
          .setTitle(data.name)
          .setURL(data.url)
          .addField(lang.UTIL.TOTAL_TRACKS, this.bot.utils.formatNumber(data.total_tracks), true)
          .addField(lang.UTIL.SPOT_TRACKS, tracks, true)
          .addField(lang.UTIL.RELEASE_DATE, data.release_date, true)
          .addField(lang.UTIL.SPOT_ARTISTS, artists, true)
          .setImage(data.images[0].url);

        return interaction.editReply({ embeds: [embed] });
      }
      case "playlist": {
        const length =
          data.tracks.length <= 10
            ? ""
            : lang.UTIL.SPOT_MORE_TRACKS.replace(
                "{tracks - 10}",
                (data.tracks.length - 10).toString(),
              );

        const tracks =
          (data.tracks as any[])
            .map((v) => `[${v.name}](${v.url})`)
            .slice(0, 10)
            .join("\n") || lang.GLOBAL.NONE;

        const embed = this.bot.utils
          .baseEmbed(interaction)
          .setDescription(data.description || lang.UTIL.NO_DESCRIPTION)
          .setTitle(data.name)
          .setURL(data.url)
          .addField(lang.UTIL.TOTAL_TRACKS, this.bot.utils.formatNumber(data.total_tracks), true)
          .addField(lang.UTIL.SPOT_TRACKS, `${tracks}\n${length}`, true)
          .setImage(data.images[0].url);

        return interaction.editReply({ embeds: [embed] });
      }
      default:
        break;
    }
  }
}
