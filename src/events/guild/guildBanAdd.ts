import { Guild, User } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildBanAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildBanAdd");
  }

  async execute(bot: Bot, guild: Guild, user: User) {
    try {
      if (!guild) return;
      if (!guild.me?.hasPermission(["MANAGE_WEBHOOKS", "VIEW_AUDIT_LOG"])) return;
      const webhook = await bot.utils.getWebhook(guild);
      if (!webhook) return;
  
      const audit = await (await guild.fetchAuditLogs()).entries.first();
      if (!audit) return;
      const target = audit.executor as User;
  
      const lang = await bot.utils.getGuildLang(guild.id);
  
      const bannedMember = user.id === target?.id ? target?.tag : lang.EVENTS.NOT_FOUND;
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.BAN_ADD)
        .addField(lang.EVENTS.BANNED_MEMBER, bannedMember)
        .setDescription(audit.reason)
        .setColor("RED");
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
