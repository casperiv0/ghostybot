import { Guild } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildCreateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildCreate");
  }

  async execute(bot: Bot, guild: Guild) {
    if (!guild) return;
    await bot.utils.addGuild(guild.id);
  }
}
