import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Command } from "structures/Command/Command";

export default class PingInteraction extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ping",
      description: "Returns the bot's ping",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    return interaction.reply({
      content: lang.UTIL.MY_PING.replace("{ping}", Math.round(this.bot.ws.ping).toString()),
    });
  }
}
