import * as DJS from "discord.js";
import { Song } from "distube";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class LyricsCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "lyrics",
      description: "Get lyrics for a song",
      options: [
        {
          type: "STRING",
          name: "query",
          description: "The title of the song (Default: currently playing song)",
          required: false,
        },
      ],
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const queue = this.bot.player.getQueue(interaction.guildId!);
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

    if (!data || data.error) {
      return interaction.editReply({
        content: lang.MUSIC.NO_LIRYCS.replace("{songTitle}", title),
      });
    }

    const songTitle = (data.title || np?.name) ?? lang.UTIL.UNKNOWN;
    const songAuthor = (data.author || np?.uploader.name) ?? lang.UTIL.UNKNOWN;
    const songThumbnail = data.thumbnail?.genius || (np as Song).thumbnail;
    const url = data.links?.genius ?? np?.url;
    const songLyrics = data.lyrics;

    const embed = this.bot.utils
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

    await interaction.editReply({ embeds: [embed] });
  }
}
