import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class GuildMemberUpdateEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMemberUpdate");
  }

  async execute(bot: Bot, oldMember: DJS.GuildMember, newMember: DJS.GuildMember) {
    try {
      if (!newMember.guild || !oldMember.guild) return;
      if (!newMember.guild.available || !oldMember.guild.available) return;
      const guild = await bot.utils.getGuildById(newMember.guild.id);
      if (!guild) return;
      if (!guild.welcome_data.enabled) return;
      const welcomeData = guild.welcome_data;

      // member passed membership screening
      if (oldMember.pending && !newMember.pending) {
        const me = newMember.guild.me;
        if (welcomeData.role_id && me?.permissions.has(DJS.Permissions.FLAGS.MANAGE_ROLES)) {
          newMember.roles.add(welcomeData.role_id);
        }
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
