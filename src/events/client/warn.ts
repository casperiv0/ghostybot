import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class WarnEvent extends Event {
  constructor(bot: Bot) {
    super(bot, DJS.Events.Warn);
  }

  async execute(bot: Bot, error: any) {
    return bot.utils.sendErrorLog(error, "warning");
  }
}
