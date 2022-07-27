import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class GuildBanAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildBanAdd");
  }

  async execute(bot: Bot, guild: DJS.Guild, user: DJS.User) {
    try {
      if (!guild) return;

      const me = bot.utils.getMe(guild);
      if (
        !me?.permissions.has([
          DJS.PermissionFlagsBits.ManageWebhooks,
          DJS.PermissionFlagsBits.ViewAuditLog,
        ])
      ) {
        return;
      }

      const webhook = await bot.utils.getWebhook(guild);
      if (!webhook) return;

      const audit = (await guild.fetchAuditLogs()).entries.first();
      if (!audit) return;
      const target = audit.executor;

      const lang = await bot.utils.getGuildLang(guild.id);

      const bannedMember = user.id === target?.id ? target.tag : lang.EVENTS.NOT_FOUND;

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle(lang.EVENTS.BAN_ADD)
        .setDescription(audit.reason ?? lang.GLOBAL.NOT_SPECIFIED)
        .setColor(DJS.Colors.Red)
        .addFields({ name: lang.EVENTS.BANNED_MEMBER, value: bannedMember });

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
