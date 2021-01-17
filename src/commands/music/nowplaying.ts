import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class NowPlayingCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "nowplaying",
      description: "Shows info about the current playing song",
      category: "music",
      aliases: ["np", "currentsong"],
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      if (!message.member?.voice.channel) {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }
  
      const playing = bot.player.isPlaying(message);
      const queue = bot.player.getQueue(message);
      if (!playing) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }
  
      if (!queue) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }
  
      const song = bot.player.nowPlaying(message);
      const durBar = bot.player.createProgressBar(message, {
        timecodes: true,
      });
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(song.title)
        .setURL(song.url)
        .setAuthor(`🎵 ${lang.MUSIC.NOW} ${playing ? lang.MUSIC.PLAYING : lang.MUSIC.PAUSED}`)
        .setImage(song.thumbnail)
        .setDescription(
          `
        **${lang.MUSIC.DURATION}:** ${song.duration}
          ${durBar}
  `
        );
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
