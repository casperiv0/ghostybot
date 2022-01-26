import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export interface MuteData {
  member: DJS.GuildMember;
  executor: DJS.User;
  reason: string;
  time?: string;
  tempMute?: boolean;
}

export default class GuildMemberMuteAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMuteAdd");
  }

  async execute(bot: Bot, guild: DJS.Guild, mute: MuteData) {
    try {
      if (!guild) return;
      if (!guild.available) return;
      const webhook = await bot.utils.getWebhook(guild);
      if (!webhook) return;

      const { member, executor, tempMute, time, reason } = mute;

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("User muted")
        .addField({ name: "Tag", value: member.user.tag, inline: true })
        .addField({ name: "Executed by", value: executor.tag, inline: true })
        .addField({ name: "Reason", value: reason })
        .setColor(DJS.Util.resolveColor("ORANGE"));

      if (tempMute && time) {
        embed.addField({ name: "Muted for", value: time });
      }

      await webhook.send({ embeds: [embed] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
