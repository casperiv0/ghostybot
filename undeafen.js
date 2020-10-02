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
    const undeafenReason = args.join(" ").slice(23);

    if (!message.member.hasPermission("DEAFEN_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    undeafenUser.voice.setDeaf(false, "undeafenReason");

    undeafenUser.user.send(
      `You've been **Undeafenned** from **${message.guild.name}**, Reason: **${undeafenReason}**`
    );
    message.channel.send(
      `${undeafenUser} was successfully undeafenned from the server. Reason: **${undeafenReason}**. I have also send a DM letting the person know.`
    );
  },
};
