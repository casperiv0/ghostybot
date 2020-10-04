const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "undeafen",
  description: "Undeafen a user from voice channel",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("DEAFEN_MEMBERS"))
      return message.channel.send(
        errorEmbed("Undeafen users! (Undeafen Members)", message)
      );

    const undeafenUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

    if (!message.member.hasPermission("DEAFEN_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    if (!undeafenUser.voice.serverDeaf) {
      return message.channel.send(
        "User is not in a voice channel or isn't deafened"
      );
    }

    undeafenUser.voice.setDeaf(false, "undeafenReason");

    undeafenUser.user.send(
      `You've been **undeafened** from **${message.guild.name}**`
    );
    message.channel.send(
      `**${undeafenUser.user.tag}** was successfully undeafened from the server. I have also send a DM letting the person know.`
    );
  },
};
