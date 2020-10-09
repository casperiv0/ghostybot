const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "deafen",
  description: "Deafen a user",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("DEAFEN_MEMBERS"))
      return message.channel.send(
        errorEmbed("Deafen users! (Deafen Members)", message)
      );

    const deafenUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    const deafenReason = args.join(" ").slice(23);

    if (!message.member.hasPermission("DEAFEN_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    if (deafenUser.voice.serverDeaf) {
      return message.channel.send(
        "User is not in a voice channel or isn't deafened"
      );
    }

    deafenUser.voice.setDeaf(true, "deafenReason");

    deafenUser.user.send(
      `You've been **Deafenned** from **${message.guild.name}**, Reason: **${deafenReason}**`
    );
    message.channel.send(
      `${deafenUser} was successfully deafenned from the server. Reason: **${deafenReason}**. I have also send a DM letting the person know.`
    );
  },
};
