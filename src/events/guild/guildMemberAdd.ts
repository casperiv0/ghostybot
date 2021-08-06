import { GuildMember, Permissions, TextChannel } from "discord.js";
import { Bot } from "structures/Bot";
import { Event } from "structures/Event";

export default class GuildMemberAddEvent extends Event {
  constructor(bot: Bot) {
    super(bot, "guildMemberAdd");
  }

  async execute(bot: Bot, member: GuildMember) {
    try {
      if (!member.guild) return;
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

      if (welcomeData.ignore_bots === true && member.user.bot === true) return;

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
            }),
          );

        const ch = bot.channels.cache.get(welcomeData.channel_id);
        if (!ch || !ch.isText()) return;
        if (!(ch as TextChannel)?.permissionsFor(bot.user!)?.has(Permissions.FLAGS.SEND_MESSAGES)) {
          return;
        }

        ch.send({ embeds: [embed] });
      }

      if (
        !member.pending &&
        welcomeData.role_id &&
        member.guild.me?.permissions.has("MANAGE_ROLES")
      ) {
        member.roles.add(welcomeData.role_id);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
    }
  }
}
