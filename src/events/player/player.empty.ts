import { Queue } from "distube";
import Bot from "structures/Bot";
import Event from "structures/Event";

export default class PlayerAddSongEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "empty");
  }

  async execute(bot: Bot, queue: Queue) {
    try {
      const channel = queue.textChannel;

      if (!channel?.guild?.available) return;

      return channel?.send({ content: "Channel is empty, Leaving the channel." });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
