import { GuildMember, TextChannel } from "discord.js";
import Bot from "../../structures/Bot";
import Event from "../../structures/Event";

export default class GuildMemberRemoveEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMemberRemove");
  }

  async execute(bot: Bot, member: GuildMember) {
    try {
      if (!member.guild) return;
      if (!member.guild.available) return;
      const guild = await bot.utils.getGuildById(member.guild.id);
      const leaveData = guild?.leave_data;
      if (!leaveData?.enabled) return;
      const message =
        leaveData?.message ||
        `**Username:** {user.username}
    **Tag:** {user.tag}
    **Id:** {user.id}
    `;

      if (leaveData.channel_id) {
        if (!member.guild.channels.cache.find((ch) => ch.id === leaveData.channel_id)) return;

        const avatar = member.user.displayAvatarURL({ dynamic: true });

        const embed = bot.utils
          .baseEmbed({ author: member.user })
          .setTitle("👋 User left")
          .setThumbnail(avatar)
          .setDescription(
            bot.utils.parseMessage(message, member.user, {
              author: member.user,
              guild: member.guild,
            })
          )
          .setColor("RED");

        const ch = bot.channels.cache.get(leaveData.channel_id);
        if (!ch) return;
        (ch as TextChannel).send(embed);

        await bot.utils.removeUser(member.user.id, member.guild.id);
        await bot.utils.removeUserWarnings(member.user.id, member.guild.id);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
