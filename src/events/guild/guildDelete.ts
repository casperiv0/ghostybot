import { Guild, GuildMember } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildDelete");
  }

  async execute(bot: Bot, guild: Guild) {
    try {
      if (!guild) return;
      await bot.utils.removeGuild(guild.id);
  
      guild.members.cache.forEach((member: GuildMember) => {
        bot.utils.removeUser(member.id, guild.id);
        bot.utils.removeUserWarnings(member.id, guild.id);
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
