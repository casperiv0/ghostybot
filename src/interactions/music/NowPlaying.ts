import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class NowPlayingCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "music",
      name: "now-playing",
      description: "Shows information about the current playing song",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const queue = this.bot.player.getQueue(interaction.guildId!);

    if (!queue || !queue.playing) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
    }

    const [song] = queue.songs;
    if (!song) {
      return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
    }

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(song.name ?? lang.UTIL.UNKNOWN)
      .setURL(song.url)
      .setAuthor(`🎵 ${lang.MUSIC.NOW} ${lang.MUSIC.PLAYING} `)
      .setDescription(`**${lang.MUSIC.DURATION}:** ${song.formattedDuration}`)
      .addField(
        lang.MUSIC.INFORMATION,
        `
**${lang.MUSIC.UPLOADER}:** ${song.uploader.name ?? lang.UTIL.UNKNOWN}
**${lang.MUSIC.LIKES}:** ${this.bot.utils.formatNumber(song.likes)}`,
      );

    if (song.thumbnail) {
      embed.setImage(song.thumbnail);
    }

    await interaction.reply({ embeds: [embed] });
  }
}
