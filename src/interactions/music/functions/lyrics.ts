import { Bot } from "structures/Bot";
import * as DJS from "discord.js";
import { Song } from "distube";
import fetch from "node-fetch";

export async function lyrics(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const queue = bot.player.getQueue(interaction.guildId!);
  const np = queue?.songs[0];
  const title = interaction.options.getString("query") ?? (np as Song)?.name;

  if (!title) {
    return interaction.reply({
      ephemeral: true,
      content: lang.MUSIC.NO_QUEUE,
    });
  }

  await interaction.deferReply();

  const data = await fetch(
    `https://some-random-api.ml/lyrics?title=${encodeURIComponent(title)}`,
  ).then((v) => v.json());

  if (!data) {
    return interaction.editReply({
      content: lang.MUSIC.NO_LIRYCS.replace("{songTitle}", title),
    });
  }

  const songTitle = (data.title || np?.name) ?? lang.UTIL.UNKNOWN;
  const songAuthor = (data.author || np?.uploader.name) ?? lang.UTIL.UNKNOWN;
  const songThumbnail = data.thumbnail?.genius || (np as Song).thumbnail;
  const url = data.links?.genius ?? np?.url;
  const songLyrics = data.lyrics;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setAuthor(songAuthor.toString())
    .setTitle(songTitle.toString())
    .setDescription(songLyrics);

  if (songThumbnail) {
    embed.setThumbnail(songThumbnail);
  }

  if (url) {
    embed.setURL(url);
  }

  if (embed.description!.length >= 2048) {
    embed.setDescription(`${songLyrics.substr(0, 2045)}...`);
  }

  return interaction.editReply({ embeds: [embed] });
}
