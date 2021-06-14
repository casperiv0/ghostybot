import { Message } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class ClearQueueCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "clearqueue",
      description: "Clear the music playlist",
      aliases: ["cq"],
      category: "music",
    });
  }

  async execute(message: Message) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!message.member?.voice.channel) {
        return message.channel.send({ content: lang.MUSIC.MUST_BE_IN_VC });
      }

      const queue = this.bot.player.getQueue(message);
      if (!this.bot.player.isPlaying(message)) {
        return message.channel.send({ content: lang.MUSIC.NO_QUEUE });
      }

      if (!queue) {
        return message.channel.send({ content: lang.MUSIC.NO_QUEUE });
      }

      if (queue && !this.bot.utils.isBotInSameChannel(message)) {
        return message.channel.send({ content: "Bot is not in this voice channel!" });
      }

      this.bot.player.clearQueue(message);
      message.channel.send({ content: lang.MUSIC.QUEUE_CLEARED });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
