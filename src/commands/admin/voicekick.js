module.exports = {
  name: "voicekick",
  aliases: ["disconnect"],
  description: "voicekick or disconnect a user from a voice channel",
  category: "admin",
  botPermissions: ["MOVE_MEMBERS"],
  memberPermissions: ["MOVE_MEMBERS"],
  async execute(bot, message, args) {
    const kickUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    const kickReason = args.join(" ").slice(23);

    if (kickUser.hasPermission("MOVE_MEMBERS" || "ADMINISTRATOR")) {
      return message.channel.send("User can't be disconnected.");
    }

    if (!kickUser.voice.channel) {
      return message.channel.send("User is not in a voice at the moment.");
    }

    if (!kickUser) return message.channel.send("User wasn't found");

    kickUser.voice.kick(kickReason);

    kickUser.user.send(
      `You've been **disconnected** from **${message.guild.name}**, Reason: **${kickReason}**`
    );
    message.channel.send(
      `**${kickUser.user.tag}** was successfully disconnected from **${kickUser.voice.channel}**. Reason: **${kickReason}**. I have also send a DM letting the person know.`
    );
  },
};
