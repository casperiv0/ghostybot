import Bot from "structures/Bot";
import * as DJS from "discord.js";
import { Song } from "distube";

export async function lyrics(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const queue = bot.player.getQueue(interaction.guildId!);
  const playing = queue?.playing;
  const np = playing || queue ? queue?.songs[0] : false;
  const title = interaction.options.getString("query") ?? (np as Song)?.name;

  const lyrics = await bot.lyricsClient.search(title as string);

  if (!lyrics) {
    return interaction.editReply({
      content: lang.MUSIC.NO_LIRYCS.replace("{songTitle}", title as string),
    });
  }

  const songTitle = (lyrics.title || (np && np.name)) ?? "Unknown";
  const songAuthor = (lyrics.artist?.name || (np && np.uploader.name)) ?? "Unknown";
  const songThumbnail = lyrics.thumbnail || (np as Song).thumbnail;
  const songLyrics = lyrics.lyrics as string;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setAuthor(songAuthor.toString())
    .setTitle(songTitle.toString())
    .setDescription(songLyrics);

  if (songThumbnail) {
    embed.setThumbnail(songThumbnail);
  }

  if (embed.description!.length >= 2048) {
    embed.setDescription(`${songLyrics.substr(0, 2045)}...`);
  }

  return interaction.editReply({ embeds: [embed] });
}
