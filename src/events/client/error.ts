import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class ErrorEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "error");
  }

  async execute(bot: Bot, error: Error) {
    return bot.utils.sendErrorLog(error, "error");
  }
}
