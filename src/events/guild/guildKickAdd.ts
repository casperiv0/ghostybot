import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export interface GuildKickData {
  member: DJS.GuildMember;
  executor: DJS.User;
  reason: string | null;
}

export default class GuildKickAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildKickAdd");
  }

  async execute(bot: Bot, guild: DJS.Guild, kick: GuildKickData) {
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
        .setColor(DJS.Colors.Orange)
        .addFields(
          { name: lang.MEMBER.TAG, value: member.user.tag, inline: true },
          { name: lang.EVENTS.EXECUTED_BY, value: executor.tag, inline: true },
          { name: lang.EVENTS.REASON, value: reason ?? lang.GLOBAL.NOT_SPECIFIED },
        );

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
