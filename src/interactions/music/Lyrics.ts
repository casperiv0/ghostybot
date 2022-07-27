import * as DJS from "discord.js";
import { Song } from "distube";
import { request } from "undici";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class LyricsCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "lyrics",
      description: "Get lyrics for a song",
      options: [
        {
          type: DJS.ApplicationCommandOptionType.String,
          name: "query",
          description: "The title of the song (Default: currently playing song)",
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const queue = this.bot.player.getQueue(interaction.guildId!);
    const np = queue?.songs[0];
    const title = interaction.options.getString("query") ?? (np as Song).name;

    if (!title) {
      return interaction.reply({
        ephemeral: true,
        content: lang.MUSIC.NO_QUEUE,
      });
    }

    await interaction.deferReply();

    const data = await request(
      `http://api.xaliks.xyz/info/lyrics?query=${encodeURIComponent(title)}`,
    ).then((v) => v.body.json());

    if (!data.lyrics) {
      return interaction.editReply({
        content: this.bot.utils.translate(lang.MUSIC.NO_LYRICS, { songTitle: title }),
      });
    }

    const songTitle = data.title || lang.UTIL.UNKNOWN;
    const songThumbnail = data.header_image_url || null;
    const artist = data.artist?.name || lang.UTIL.UNKNOWN;
    const artistImageURL = data.artist?.header_image_url;
    const artistURL = data.artist?.url;
    const url = data.url || null;
    const songLyrics = data.lyrics;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setAuthor({ name: artist.toString(), iconURL: artistImageURL, url: artistURL })
      .setTitle(songTitle.toString())
      .setDescription(songLyrics)
      .setURL(url);

    if (songThumbnail) {
      embed.setThumbnail(songThumbnail);
    }

    if (embed.data.description!.length >= 2048) {
      embed.setDescription(`${songLyrics.slice(0, 2045)}...`);
    }

    await interaction.editReply({ embeds: [embed] });
  }
}
