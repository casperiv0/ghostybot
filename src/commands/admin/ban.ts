import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BanCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ban",
      description: "ban",
      usage: "<user>",
      category: "admin",
      botPermissions: ["BAN_MEMBERS"],
      memberPermissions: ["BAN_MEMBERS"],
      requiredArgs: [{ name: "user" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const banMember = await bot.utils.findMember(message, args);
      let banReason = args.slice(1).join(" ");
      if (!message.guild?.me) return;
  
      if (!banMember) {
        return message.channel.send(lang.MEMBER.NOT_FOUND);
      }
  
      if (!banReason) banReason = lang.GLOBAL.NOT_SPECIFIED;
  
      if (!banMember.bannable || banMember.hasPermission("BAN_MEMBERS")) {
        return message.channel.send(lang.MEMBER.CANNOT_BE_BANNED);
      }
  
      if (message.guild.me.roles.highest.comparePositionTo(banMember.roles.highest) < 0) {
        return message.channel.send(
          lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", banMember.user?.tag)
        );
      }
  
      banMember.ban({
        days: 7,
        reason: `${lang.ADMIN.BAN_BANNED_BY}: ${message.author.tag}\n**${lang.GLOBAL.REASON}:** ${banReason}`,
      });
  
      try {
        banMember.user.send(
          lang.MEMBER.DM_BAN_MESSAGE.replace("{guild_name}", message.guild.name).replace(
            "{ban_reason}",
            banReason
          )
        );
        // eslint-disable-next-line no-empty
      } catch {}
  
      message.channel.send(
        lang.MEMBER.GUILD_BAN_MESSAGE.replace("{member}", banMember.user.username).replace(
          "{ban_reason}",
          banReason
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
