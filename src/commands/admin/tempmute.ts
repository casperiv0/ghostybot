import { Message } from "discord.js";
import ms from "ms";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class TempMuteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "tempmute",
      description: "Temporary mute someone",
      category: "admin",
      botPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
      memberPermissions: ["MANAGE_ROLES"],
      usage: "<user> <time> <reason>",
      requiredArgs: [{ name: "user" }, { name: "time", type: "time" }, { name: "reason" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    if (!message.guild?.me) return;
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const muteMember = await bot.utils.findMember(message, args);

      const [, time, ...rest] = args;
      const reason = rest.join(" ") || "N/A";

      const muteRole = await bot.utils.findOrCreateMutedRole(message.guild);
      if (!muteRole) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }

      if (!muteMember) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (muteMember?.roles.cache.find((r) => r.id === muteRole?.id)) {
        return message.channel.send(lang.ADMIN.ALREADY_MUTED);
      }

      if (muteMember.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(lang.ADMIN.CAN_NOT_MUTED);
      }

      bot.utils.updateMuteChannelPerms(message.guild, muteMember.user.id, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false,
      });

      muteMember.roles.add(muteRole);
      await bot.utils.updateUserById(muteMember.user.id, message.guild?.id, {
        mute: {
          muted: true,
          ends_at: Date.now() + ms(time),
          time,
          reason: reason,
        },
      });

      muteMember.user.send(
        lang.ADMIN.TEMP_MUTED.replace("{guildName}", message.guild.name)
          .replace("{reason}", reason)
          .replace("{time}", time)
      );

      message.channel.send(
        lang.ADMIN.SUCCES_MUTED.replace("{muteMemberTag}", muteMember.user.tag)
          .replace("{time}", time)
          .replace("{reason}", reason)
      );

      bot.emit("guildMuteAdd", message.guild, {
        member: muteMember,
        executor: message.author,
        tempMute: true,
        reason: reason,
        time,
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
