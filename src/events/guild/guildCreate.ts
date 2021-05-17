import { Constants, Guild } from "discord.js";
import Bot from "structures/Bot";
import Event from "structures/Event";

export default class GuildCreateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, Constants.Events.GUILD_CREATE);
  }

  async execute(bot: Bot, guild: Guild) {
    if (!guild) return;
    await bot.utils.addGuild(guild.id);
  }
}
