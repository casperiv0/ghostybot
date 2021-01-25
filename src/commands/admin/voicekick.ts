import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class VoiceKickCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "voicekick",
      aliases: ["disconnect"],
      description: "voicekick or disconnect a user from a voice channel",
      category: "admin",
      usage: "<user>",
      botPermissions: ["MOVE_MEMBERS"],
      memberPermissions: ["MOVE_MEMBERS"],
      requiredArgs: [{ name: "user" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    const kickMember = await bot.utils.findMember(message, args);
    try {
      const kickReason = args.join(" ").slice(23);
  
      if (!kickMember) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }
  
      if (kickMember.hasPermission("MOVE_MEMBERS" || "ADMINISTRATOR")) {
        return message.channel.send(lang.ADMIN.CAN_NOT_DISC);
      }
  
      if (!kickMember.voice.channel) {
        return message.channel.send(lang.ADMIN.NOT_IN_VOICE);
      }
  
      kickMember.voice.kick(kickReason);
  
      kickMember.user.send(
        lang.ADMIN.YOU_DISC.replace("{guildName}", `${message.guild?.name}`).replace(
          "{reason}",
          kickReason
        )
      );
  
      message.channel.send(
        lang.ADMIN.USER_DISC.replace("{kickUserTag}", kickMember.user.tag)
          .replace("{kickUserVoiceChannel}", `${kickMember?.voice?.channel}`)
          .replace("{reason}", kickReason)
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
