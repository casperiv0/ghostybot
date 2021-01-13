import { Guild, GuildMember } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildDeleteEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildDelete");
  }

  async execute(bot: Bot, guild: Guild) {
    if (!guild) return;
    await bot.utils.removeGuild(guild.id);

    guild.members.cache.forEach((member: GuildMember) => {
      bot.utils.removeUser(member.id, guild.id);
    });
  }
}
