import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RemoveCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "remove",
      description: "Remove a song from the queue",
      category: "music",
      aliases: [],
      requiredArgs: [{ name: "track-number", type: "number" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [songNo] = args;
      const queue = bot.player.getQueue(message);
      if (!message.member?.voice.channel) {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }

      if (!bot.player.isPlaying(message)) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      if (!queue) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      if (isNaN(Number(songNo))) {
        return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
      }

      if (Number(songNo) < 1) {
        return message.channel.send(
          lang.MUSIC.BETWEEN_1_TOTALQUEUE.replace("{totalQueue}", `${queue.tracks.length - 1}`)
        );
      }

      if (Number(songNo) >= queue.tracks.length) {
        return message.channel.send(
          lang.MUSIC.BETWEEN_1_TOTALQUEUE.replace("{totalQueue}", `${queue.tracks.length - 1}`)
        );
      }

      const song = queue.tracks[Number(songNo)];
      bot.player.remove(message, Number(songNo));
      await message.channel.send(`**${song.title}** ${lang.MUSIC.REMOVE_SUCCESS}`);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
