import { Constants } from "discord.js";
import Bot from "structures/Bot";
import Event from "structures/Event";

export default class ErrorEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.Events.ERROR);
  }

  async execute(_: Bot, error: Error) {
    this.bot.utils.sendErrorLog(error, "error");
  }
}
