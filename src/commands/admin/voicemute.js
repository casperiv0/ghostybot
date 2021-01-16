module.exports = {
  name: "voicemute",
  description: "voicemute a user",
  usage: "<user>",
  category: "admin",
  botPermissions: ["MUTE_MEMBERS"],
  memberPermissions: ["MUTE_MEMBERS"],
  requiredArgs: ["user"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const muteUser = await bot.utils.findMember(message, args);
    const muteReason = args.join(" ").slice(23);

    if (!muteUser) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
    }

    if (muteUser.voice.serverMute) {
      return message.channel.send(lang.ADMIN.USER_NOT_VOICE_OR_MUTED);
    }

    muteUser.voice.setMute(true, "muteReason");

    muteUser.user.send(lang.ADMIN.YOU_MUTED
      .replace("{guildName}", message.guild.name)
      .replace("{reason}", muteReason));

    message.channel.send(lang.ADMIN.USER_MUTED
      .replace("{muteUserTag}", muteUser.user.tag)
      .replace("{reason}", muteReason));
  },
};
