import { GuildMember, Message, Permissions } from "discord.js";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class BanCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ban",
      description: "ban",
      usage: "<user>",
      category: "admin",
      botPermissions: [Permissions.FLAGS.BAN_MEMBERS],
      memberPermissions: [Permissions.FLAGS.BAN_MEMBERS],
      requiredArgs: [{ name: "user" }],
    });
  }

  bannable(member: GuildMember) {
    if (member.bannable) return true;

    if (member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return false;
    if (member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return false;

    return true;
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!message.guild?.me) return;

      const banMember = await this.bot.utils.findMember(message, args);
      const banReason = args.slice(1).join(" ") || lang.GLOBAL.NOT_SPECIFIED;

      if (!banMember) {
        return message.channel.send({
          content: lang.MEMBER.NOT_FOUND,
        });
      }

      if (!this.bannable(banMember)) {
        return message.channel.send({
          content: lang.MEMBER.CANNOT_BE_BANNED,
        });
      }

      if (message.guild.me.roles.highest.comparePositionTo(banMember.roles.highest) < 0) {
        return message.channel.send({
          content: lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", banMember.user?.tag),
        });
      }

      banMember.ban({
        days: 7,
        reason: `${lang.ADMIN.BAN_BANNED_BY}: ${message.author.tag}\n**${lang.GLOBAL.REASON}:** ${banReason}`,
      });

      try {
        banMember.user.send({
          content: lang.MEMBER.DM_BAN_MESSAGE.replace("{guild_name}", message.guild.name).replace(
            "{ban_reason}",
            banReason,
          ),
        });
        // eslint-disable-next-line no-empty
      } catch {}

      message.channel.send({
        content: lang.MEMBER.GUILD_BAN_MESSAGE.replace("{member}", banMember.user.username).replace(
          "{ban_reason}",
          banReason,
        ),
      });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
