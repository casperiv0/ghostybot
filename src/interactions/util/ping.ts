import { CommandInteraction } from "discord.js";
import Bot from "structures/Bot";
import Interaction from "structures/Interaction";

export default class PingInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "ping",
      description: "Returns the bot's ping",
      category: "util",
    });
  }

  async execute(interaction: CommandInteraction) {
    const lang = await this.bot.utils.getGuildLang(interaction.guildId!);

    return interaction.reply({
      content: lang.UTIL.MY_PING.replace("{ping}", Math.round(this.bot.ws.ping).toString()),
    });
  }
}
