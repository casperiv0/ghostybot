import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class WarnEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "warn");
  }

  async execute(bot: Bot, error: any) {
    return bot.utils.sendErrorLog(error, "warning");
  }
}
