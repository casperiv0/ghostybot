import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class RemoveCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "remove",
      description: "Remove a song from the queue",
      category: "music",
      requiredArgs: [{ name: "track-number", type: "number" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [songNo] = args;
      const queue = this.bot.player.getQueue(message);
      if (!message.member?.voice.channel) {
        return message.channel.send({ content: lang.MUSIC.MUST_BE_IN_VC });
      }

      if (!queue || !queue.playing) {
        return message.channel.send({ content: lang.MUSIC.NO_QUEUE });
      }

      if (queue && !this.bot.utils.isBotInSameChannel(message)) {
        return message.channel.send({ content: "Bot is not in this voice channel!" });
      }

      if (isNaN(Number(songNo))) {
        return message.channel.send({ content: lang.LEVELS.PROVIDE_VALID_NR });
      }

      if (Number(songNo) < 1) {
        return message.channel.send({
          content: lang.MUSIC.BETWEEN_1_TOTALQUEUE.replace(
            "{totalQueue}",
            `${queue.songs.length - 1}`,
          ),
        });
      }

      if (Number(songNo) >= queue.songs.length) {
        return message.channel.send({
          content: lang.MUSIC.BETWEEN_1_TOTALQUEUE.replace(
            "{totalQueue}",
            `${queue.songs.length - 1}`,
          ),
        });
      }

      const song = queue.songs[Number(songNo)];
      queue.songs.splice(Number(songNo), 1);
      await message.channel.send({ content: `**${song.name}** ${lang.MUSIC.REMOVE_SUCCESS}` });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
