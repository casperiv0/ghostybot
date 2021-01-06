module.exports = {
  name: "undeafen",
  description: "Undeafen a user from voice channel",
  category: "admin",
  botPermissions: ["DEAFEN_MEMBERS"],
  memberPermissions: ["DEAFEN_MEMBERS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const undeafenUser = await bot.findMember(message, args);

    if (!undeafenUser.voice.serverDeaf) return message.channel.send(lang.ADMIN.NOT_IN_VOICE_OR_NOT_DEAF);

    undeafenUser.voice.setDeaf(false, "undeafenReason");

    undeafenUser.user.send(lang.ADMIN.UNDEAFENED_USER.replace("{guildName}", message.guild.name));
    message.channel.send(lang.ADMIN.UNDEAFENED.replace("{undeafenUserTag}", undeafenUser.user.tag));
  },
};
