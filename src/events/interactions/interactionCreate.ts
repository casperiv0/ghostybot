import { ApplicationCommand } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class InteractionCreateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "applicationCommandCreate");
  }

  async execute(bot: Bot, interaction: ApplicationCommand) {
    bot.utils.sendErrorLog({ stack: `Loaded interaction ${interaction.name}` }, "warning");
  }
}
