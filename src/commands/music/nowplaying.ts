import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class NowPlayingCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "nowplaying",
      description: "Shows info about the current playing song",
      category: "music",
      aliases: ["np", "currentsong"],
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      if (!message.member?.voice.channel) {
        return message.channel.send({ content: lang.MUSIC.MUST_BE_IN_VC });
      }

      const queue = this.bot.player.getQueue(message);

      if (!queue || !queue.playing) {
        return message.channel.send({ content: lang.MUSIC.NO_QUEUE });
      }

      const [song] = queue.songs;

      if (!song) {
        return message.channel.send({ content: lang.MUSIC.NO_QUEUE });
      }

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(song.name ?? "Unknown")
        .setURL(song.url)
        .setAuthor(`🎵 ${lang.MUSIC.NOW} ${lang.MUSIC.PLAYING} `)
        .setDescription(`**${lang.MUSIC.DURATION}:** ${song.formattedDuration}`);

      if (song.thumbnail) {
        embed.setImage(song.thumbnail);
      }

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
