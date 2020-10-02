const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "voiceunmute",
  description: "unmute a user from voice channel",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        errorEmbed("unmute users! (Unmute Members)", message)
      );

    const unmuteUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    const unmuteReason = args.join(" ").slice(23);

    if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    unmuteUser.voice.setMute(false, "unmuteReason");

    unmuteUser.user.send(
      `You've been **Unmuted** from **${message.guild.name}**, Reason: **${unmuteReason}**`
    );
    message.channel.send(
      `${unmuteUser} was successfully unmuted from the server. Reason: **${unmuteReason}**. I have also send a DM letting the person know.`
    );
  },
};
