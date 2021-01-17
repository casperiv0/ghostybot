import { GuildMember, Role } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildMemberRoleRemoveEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMemberRoleRemove");
  }

  async execute(bot: Bot, member: GuildMember, role: Role) {
    try {
      if (!member.guild) return;
      if (!member.guild.available) return;
  
      const webhook = await bot.utils.getWebhook(member.guild);
      if (!webhook) return;
  
      const embed = bot.utils
        .baseEmbed({ author: bot.user })
        .setTimestamp()
        .setColor("ORANGE")
        .setTitle("Member Update: `Role Remove`")
        .setDescription(`${member} was **removed** from ${role} role.`);
  
      webhook.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
