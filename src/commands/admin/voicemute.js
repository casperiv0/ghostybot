const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "voicemute",
  description: "voicemute a user",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MUTE_MEMBERS"))
      return message.channel.send(
        errorEmbed("mute users! (Mute Members)", message)
      );

    const muteUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    const muteReason = args.join(" ").slice(23);

    if (!message.member.hasPermission("MUTE_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    if (muteUser.voice.serverMute) {
      return message.channel.send(
        "User is not in a voice channel or is already muted"
      );
    }

    muteUser.voice.setMute(true, "muteReason");

    muteUser.user.send(
      `You've been **Muted** from **${message.guild.name}**, Reason: **${muteReason}**`
    );
    message.channel.send(
      `**${muteUser.user.tag}** was successfully muted from the server. Reason: **${muteReason}**. I have also send a DM letting the person know.`
    );
  },
};
