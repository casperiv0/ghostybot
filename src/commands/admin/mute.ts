import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class MuteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "mute",
      description: "Mute a user",
      category: "admin",
      usage: "<@user>",
      botPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
      memberPermissions: ["MANAGE_ROLES"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const muteMember = await bot.utils.findMember(message, args);
      const guild = await bot.utils.getGuildById(message.guild?.id);
      let muteReason = args.slice(1).join(" ");
  
      if (!muteReason) muteReason = lang.GLOBAL.NOT_SPECIFIED;
      if (!message.guild?.me) return;
  
      const muted_role =
        !guild?.muted_role_id || guild?.muted_role_id === "Disabled"
          ? await bot.utils.findOrCreateMutedRole(message.guild)
          : message.guild.roles.cache.find((r) => r.id === guild?.muted_role_id) ||
            (await bot.utils.findOrCreateMutedRole(message.guild));
  
      if (!muteMember) {
        return message.channel.send(lang.EASY_GAMES.PROVIDE_MEMBER);
      }
  
      if (muteMember?.roles.cache.find((r) => r.id === muted_role?.id)) {
        return message.channel.send(lang.ADMIN.MUTE_ALREADY_MUTED);
      }
  
      if (muteMember.hasPermission("MANAGE_ROLES")) {
        return message.channel.send(lang.ADMIN.MUTE_CANNOT_MUTE);
      }
  
      if (message.guild.me.roles.highest.comparePositionTo(muteMember.roles.highest) < 0)
        return message.channel.send(
          lang.ADMIN.MY_ROLE_MUST_BE_HIGHER.replace("{member}", muteMember.user.tag)
        );
  
      const muteRole = await bot.utils.findOrCreateMutedRole(message.guild);
      bot.utils.updateMuteChannelPerms(message.guild, muteMember.user.id, {
        SEND_MESSAGES: false,
        ADD_REACTIONS: false,
        CONNECT: false,
      });
  
      // Add role & send msg
      muteMember.roles.add(muteRole!);
      muteMember.user.send(
        lang.ADMIN.MUTE_SUCCESS_DM.replace("{guild}", message.guild.name).replace(
          "{reason}",
          muteReason
        )
      );
      message.channel.send(
        lang.ADMIN.MUTE_SUCCESS.replace("{tag}", muteMember.user.tag).replace("{reason}", muteReason)
      );
  
      bot.emit("guildMuteAdd", message.guild, {
        member: muteMember,
        executor: message.author,
        tempMute: false,
        reason: muteReason,
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
