import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class VoiceMuteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "voicemute",
      description: "voicemute a user",
      usage: "<user>",
      category: "admin",
      botPermissions: ["MUTE_MEMBERS"],
      memberPermissions: ["MUTE_MEMBERS"],
      requiredArgs: [{ name: "user" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const muteUser = await bot.utils.findMember(message, args);
      const muteReason = args.join(" ").slice(23);

      if (!muteUser) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (muteUser.voice.serverMute) {
        return message.channel.send(lang.ADMIN.USER_NOT_VOICE_OR_MUTED);
      }

      muteUser.voice.setMute(true, "muteReason");

      muteUser.user.send(
        lang.ADMIN.YOU_MUTED.replace("{guildName}", `${message.guild?.name}`).replace(
          "{reason}",
          muteReason
        )
      );

      message.channel.send(
        lang.ADMIN.USER_MUTED.replace("{muteUserTag}", muteUser.user.tag).replace(
          "{reason}",
          muteReason
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
