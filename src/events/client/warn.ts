import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class ErrorEvent extends Event {
  async execute(bot: Bot, error: string) {
    this.bot.utils.sendErrorLog(error, "warning");
  }
}
