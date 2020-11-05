module.exports = {
  name: "voiceunmute",
  description: "unmute a user from voice channel",
  category: "admin",
  botPermissions: ["MUTE_MEMBERS"],
  memberPermissions: ["MUTE_MEMBERS"],
  async execute(bot, message, args) {
    const unmuteUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

    if (!unmuteUser.voice.serverMute) {
      return message.channel.send(
        "User is not in a voice channel or isn't muted"
      );
    }

    unmuteUser.voice.setMute(false, "unmuteReason");

    unmuteUser.user.send(
      `You've been **Unmuted** from **${message.guild.name}**`
    );
    message.channel.send(
      `**${unmuteUser.user.tag}** was successfully unmuted from the server. I have also send a DM letting the person know.`
    );
  },
};
