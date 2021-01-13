import Bot from "../../structures/Bot";
import Event from "../../structures/Event";
import { ErrorLog } from "../../utils/Util";

export default class ErrorEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "error");
  }

  async execute(bot: Bot, error: ErrorLog) {
    this.bot.utils.sendErrorLog(error, "error");
  }
}
