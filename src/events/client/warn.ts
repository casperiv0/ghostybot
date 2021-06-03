import { Constants } from "discord.js";
import Bot from "structures/Bot";
import Event from "structures/Event";

export default class WarnEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.Events.WARN);
  }

  async execute(_: Bot, error: any) {
    this.bot.utils.sendErrorLog(error, "warning");
  }
}
