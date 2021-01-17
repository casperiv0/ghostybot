import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ClearQueueCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "clearqueue",
      description: "Clear the music playlist",
      aliases: ["cq"],
      category: "music",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!message.member?.voice.channel) {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }

      const playing = bot.player.isPlaying(message);

      if (!playing) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      bot.player.clearQueue(message);
      message.channel.send(lang.MUSIC.QUEUE_CLEARED);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
