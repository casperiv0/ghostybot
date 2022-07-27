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
      const fields: DJS.EmbedField[] = [
        { name: "Tag", value: member.user.tag, inline: true },
        { name: "Executed by", value: executor.tag, inline: true },
        { name: "Reason", value: reason, inline: false },
      ];

      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("User muted")
        .setColor(DJS.Colors.Orange)
        .addFields();

      if (tempMute && time) {
        fields.push({ name: "Muted for", value: time, inline: false });
      }

      await webhook.send({ embeds: [embed.addFields(fields)] });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
