import { GuildMember, TextChannel } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildMemberAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMemberAdd");
  }

  async execute(bot: Bot, member: GuildMember) {
    try {
      if (!member.guild) return;
      // if (member.pending) return; v13
      if (!member.guild.available) return;
      const guild = await bot.utils.getGuildById(member.guild.id);
      const welcomeData = guild?.welcome_data;
      if (!welcomeData?.enabled) return;
  
      const message =
        welcomeData?.message ||
        `**Username:** {user.username}
      **Tag:** {user.tag}
      **Id:** {user.id}
      `;
  
      if (welcomeData.channel_id) {
        if (!member.guild.channels.cache.find((ch) => ch.id === welcomeData.channel_id)) return;
  
        const avatar = member.user.displayAvatarURL({ dynamic: true });
  
        const embed = bot.utils
          .baseEmbed({ author: member.user })
          .setTitle(`Welcome to **${member.guild.name}**`)
          .setThumbnail(avatar)
          .setDescription(
            bot.utils.parseMessage(message, member.user, {
              author: member.user,
              guild: member.guild,
            })
          );
  
        const ch = bot.channels.cache.get(welcomeData.channel_id);
        if (!ch) return;
        (ch as TextChannel).send(embed);
      }
  
      if (welcomeData.role_id) {
        if (!member.guild.me?.hasPermission("MANAGE_ROLES")) return;
        member.roles.add(welcomeData.role_id);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
