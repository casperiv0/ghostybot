import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function spotify(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const type = interaction.options.getString("type", true) as
    | "track"
    | "artist"
    | "album"
    | "playlist";
  const query = interaction.options.getString("query", true);

  const url = `http://api.xaliks.xyz/info/spotify?type=${type}&query=${encodeURIComponent(query)}`;
  const data = await fetch(url).then((res) => res.json());

  if (data.error) {
    return interaction.editReply({
      content: data.error,
    });
  }

  switch (type.toLowerCase()) {
    case "track": {
      const artists =
        data.album.artists.map((art) => `[${art.name}](${art.url})`).join(", ") || lang.GLOBAL.NONE;

      const embed = bot.utils
        .baseEmbed(interaction)
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

      return interaction.editReply({ embeds: [embed] });
    }
    case "artist": {
      const topTracks =
        data.top10tracks?.map((v) => `[${v.name}](${v.url})`)?.join("\n") || lang.GLOBAL.NONE;
      const genres = data.genres?.join("\n") || lang.GLOBAL.NONE;

      const embed = bot.utils
        .baseEmbed(interaction)
        .setTitle(data.name)
        .setURL(data.url)
        .addField(lang.UTIL.GH_FOLLOWERS, bot.utils.formatNumber(data.followers), true)
        .addField("Genres", genres, true)
        .addField("Top 10 tracks", topTracks);

      if (data.images.length > 0) {
        embed.setImage(data.images[0].url);
      }

      return interaction.editReply({ embeds: [embed] });
    }
    case "album": {
      const tracks = data.tracks.map((v) => `[${v.name}](${v.url})`).join("\n") || lang.GLOBAL.NONE;
      const artists =
        data.artists.map((art) => `[${art.name}](${art.url})`).join(", ") || lang.GLOBAL.NONE;

      const embed = bot.utils
        .baseEmbed(interaction)
        .setTitle(data.name)
        .setURL(data.url)
        .addField(lang.UTIL.TOTAL_TRACKS, bot.utils.formatNumber(data.total_tracks), true)
        .addField("Tracks", tracks, true)
        .addField(lang.UTIL.RELEASE_DATE, data.release_date, true)
        .addField("Artists", artists, true)
        .setImage(data.images[0].url);

      return interaction.editReply({ embeds: [embed] });
    }
    case "playlist": {
      const length = data.tracks.length <= 10 ? "" : `${data.tracks.length - 10} more tracks`;

      const tracks =
        (data.tracks as any[])
          .map((v) => `[${v.name}](${v.url})`)
          .slice(0, 10)
          .join("\n") || lang.GLOBAL.NONE;

      const embed = bot.utils
        .baseEmbed(interaction)
        .setDescription(data.description || "No description")
        .setTitle(data.name)
        .setURL(data.url)
        .addField(lang.UTIL.TOTAL_TRACKS, bot.utils.formatNumber(data.total_tracks), true)
        .addField("Tracks", `${tracks}\n${length}`, true)
        .setImage(data.images[0].url);

      return interaction.editReply({ embeds: [embed] });
    }
    default:
      break;
  }
}
