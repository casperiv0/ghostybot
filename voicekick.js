const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "voicekick",
  aliases: ["disconnect"],
  description: "voicekick or disconnect a user from a voice channel",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MOVE_MEMBERS"))
      return message.channel.send(
        errorEmbed("move users! (Move Members)", message)
      );

    const kickUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    const kickReason = args.join(" ").slice(23);

    if (!message.member.hasPermission("MOVE_MEMBERS" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    if (!kickUser.voice.channel)
      return message.channel.send(`${kickUser} is not in a voice now!`);

     if (!kickUser)
      return message.channel.send("User wasn't found");

    kickUser.voice.kick(kickReason);

    kickUser.user.send(
      `You've been **Disconnected** from **${message.guild.name}**, Reason: **${kickReason}**`
    );
    message.channel.send(
      `${kickUser} was successfully disconnected from the server. Reason: **${kickReason}**. I have also send a DM letting the person know.`
    );
  },
};
