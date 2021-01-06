module.exports = {
  name: "voiceunmute",
  description: "unmute a user from voice channel",
  category: "admin",
  botPermissions: ["MUTE_MEMBERS"],
  memberPermissions: ["MUTE_MEMBERS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const unmuteUser = await bot.findMember(message, args);

    if (!unmuteUser.voice.serverMute) {
      return message.channel.send(lang.ADMIN.USER_NOT_VOICE_OR_NOT_MUTED);
    }

    unmuteUser.voice.setMute(false, "unmuteReason");

    unmuteUser.user.send(lang.ADMIN.YOU_UNMUTED.replace("{guildName}", message.guild.name));
    message.channel.send(lang.ADMIN.USER_SUC_UNMUTED.replace("{unmuteUserTag}", unmuteUser.user.tag));
  },
};
