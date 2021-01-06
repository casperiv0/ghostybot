module.exports = {
  name: "voicekick",
  aliases: ["disconnect"],
  description: "voicekick or disconnect a user from a voice channel",
  category: "admin",
  botPermissions: ["MOVE_MEMBERS"],
  memberPermissions: ["MOVE_MEMBERS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const kickUser = await bot.findMember(message, args);
    const kickReason = args.join(" ").slice(23);

    if (!kickUser) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
    }

    if (kickUser.hasPermission("MOVE_MEMBERS" || "ADMINISTRATOR")) {
      return message.channel.send(lang.ADMIN.CAN_NOT_DISC);
    }

    if (!kickUser.voice.channel) {
      return message.channel.send(lang.ADMIN.NOT_IN_VOICE);
    }

    kickUser.voice.kick(kickReason);

    kickUser.user.send(lang.ADMIN.YOU_DISC
      .replace("{guildName}", message.guild.name)
      .replace("{reason}", kickReason));

    message.channel.send(lang.ADMIN.USER_DISC
      .replace("{kickUserTag}", kickUser.user.tag)
      .replace("{kickUserVoiceChannel}", kickUser.voice.channel)
      .replace("{reason}", kickReason));
  },
};
