import { Constants } from "discord.js";
import Bot from "structures/Bot";
import Event from "structures/Event";
import { ErrorLog } from "@utils/Util";

export default class WarnEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.Events.WARN);
  }

  async execute(_: Bot, error: ErrorLog) {
    this.bot.utils.sendErrorLog(error, "warning");
  }
}
