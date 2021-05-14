import { Message, Permissions } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class VoiceUnMuteCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "voiceunmute",
      description: "unmute a user from voice channel",
      usage: "<user>",
      category: "admin",
      botPermissions: [Permissions.FLAGS.MUTE_MEMBERS],
      memberPermissions: [Permissions.FLAGS.MUTE_MEMBERS],
      requiredArgs: [{ name: "user" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const unmuteMember = await this.bot.utils.findMember(message, args);

      if (!unmuteMember) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (!unmuteMember.voice.serverMute) {
        return message.channel.send(lang.ADMIN.USER_NOT_VOICE_OR_NOT_MUTED);
      }

      unmuteMember.voice.setMute(false, "unmuteReason");

      unmuteMember.user.send(
        lang.ADMIN.YOU_UNMUTED.replace("{guildName}", `${message.guild?.name}`),
      );
      message.channel.send(
        lang.ADMIN.USER_SUC_UNMUTED.replace("{unmuteUserTag}", unmuteMember.user.tag),
      );
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
