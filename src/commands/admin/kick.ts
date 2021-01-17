import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class KickCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "kick",
      description: "Kick a user",
      category: "admin",
      botPermissions: ["KICK_MEMBERS"],
      memberPermissions: ["KICK_MEMBERS"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const kickMember = await bot.utils.findMember(message, args);
      let kickReason = args.slice(1).join(" ");
  
      if (!message.guild?.me) return;
  
      if (!kickMember) {
        return message.channel.send(lang.MEMBER.NOT_FOUND);
      }
  
      if (!kickReason) kickReason = lang.GLOBAL.NOT_SPECIFIED;
  
      if (!kickMember.kickable || kickMember.hasPermission("KICK_MEMBERS")) {
        return message.channel.send(lang.ADMIN.KICK_CANNOT_KICK);
      }
  
      if (message.guild.me.roles.highest.comparePositionTo(kickMember.roles.highest) < 0) {
        return message.channel.send(
          lang.ADMIN.MY_ROLE_MUST_BE_HIGHER.replace("{member}", kickMember.user.tag)
        );
      }
  
      kickMember.kick(kickReason);
  
      kickMember.user.send(
        lang.ADMIN.KICK_SUCCESS_DM.replace("{guild}", message.guild.name).replace(
          "{reason}",
          kickReason
        )
      );
      message.channel.send(
        lang.ADMIN.KICK_SUCCESS.replace("{tag}", kickMember.user.tag).replace("{reason}", kickReason)
      );
  
      bot.emit("guildKickAdd", message.guild, {
        member: kickMember,
        executor: message.author,
        reason: kickReason,
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
