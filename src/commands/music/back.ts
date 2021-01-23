import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BackCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "back",
      description: "Play back the previous song",
      aliases: ["prev"],
      category: "music",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      if (!message.member?.voice.channel) {
        return message.channel.send(lang.MUSIC.MUST_BE_IN_VC);
      }
  
      const queue = bot.player.getQueue(message);
      if (!bot.player.isPlaying(message)) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }
  
      if (!queue) {
        return message.channel.send(lang.MUSIC.NO_QUEUE);
      }

      if (queue.previousTracks.length < 1) {
        return message.channel.send(lang.MUSIC.NO_PREV_QUEUE);
      }
  
      bot.player.back(message);
      message.react("👍");
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
