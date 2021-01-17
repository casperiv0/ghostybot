import { Guild, GuildMember, User } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export interface GuildKickData {
  member: GuildMember;
  executor: User;
  reason: string | null;
}

export default class GuildKickAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildKickAdd");
  }

  async execute(bot: Bot, guild: Guild, kick: GuildKickData) {
    try {
      if (!guild) return;
      if (!guild.available) return;
      const webhook = await bot.utils.getWebhook(guild);
      if (!webhook) return;
      const lang = await bot.utils.getGuildLang(guild.id);
  
      const { member, executor, reason } = kick;
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.KICK_ADD)
        .addField(lang.MEMBER.TAG, member.user.tag, true)
        .addField(lang.EVENTS.EXECUTED_BY, executor.tag, true)
        .addField(lang.EVENTS.REASON, reason)
        .setColor("ORANGE");
  
      return webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
