import { GuildMember } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildMemberUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMemberUpdate");
  }

  async execute(bot: Bot, oldMember: GuildMember, newMember: GuildMember) {
    try {
      if (!newMember.guild || !oldMember.guild) return;
      if (!newMember.guild.available || !oldMember.guild.available) return;
      const guild = await bot.utils.getGuildById(newMember.guild.id);
      if (!guild) return;
      if (!guild.welcome_data.enabled) return;
      const welcomeData = guild.welcome_data;

      // Member passed membership screening
      if (oldMember.pending && !newMember.pending) {
        if (welcomeData.role_id) {
          if (!newMember.guild.me?.permissions.has("MANAGE_ROLES")) return;
          newMember.roles.add(welcomeData.role_id);
        }
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
