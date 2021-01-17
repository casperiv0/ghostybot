import { Guild, GuildMember, User } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export interface MuteData {
  member: GuildMember;
  executor: User;
  reason: string;
  time?: string;
  tempMute?: boolean;
}

export default class GuildMemberMuteAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMuteAdd");
  }

  async execute(bot: Bot, guild: Guild, mute: MuteData) {
    try {
      if (!guild) return;
      if (!guild.available) return;
      const webhook = await bot.utils.getWebhook(guild);
      if (!webhook) return;
  
      const { member, executor, tempMute, time, reason } = mute;
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTitle("User muted")
        .addField("Tag", member.user.tag, true)
        .addField("Executed by", executor.tag, true)
        .addField("Reason", reason)
        .setColor("ORANGE");
  
      if (tempMute) {
        embed.addField("Muted for", time);
      }
  
      return webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
