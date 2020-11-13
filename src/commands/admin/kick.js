module.exports = {
  name: "kick",
  description: "Kick a user",
  category: "admin",
  botPermissions: ["KICK_MEMBERS"],
  memberPermissions: ["KICK_MEMBERS"],
  async execute(bot, message, args) {
    const kickUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let kickReason = args.join(" ").slice(23);

    if (!kickUser) {
      return message.channel.send("User wasn't found");
    }

    if (!kickReason) kickReason = "Not Specified";

    if (!kickUser.kickable || kickUser.hasPermission("KICK_MEMBERS")) {
      return message.channel.send("That person can't be kicked!");
    }

    if (
      message.guild.me.roles.highest.comparePositionTo(kickUser.roles.highest) <
      0
    ) {
      return message.channel.send(
        `My role must be higher than **${kickUser.tag}** highest role!`
      );
    }

    kickUser.kick(kickReason);

    kickUser.user.send(
      `You've been **kicked** from **${message.guild.name}**, Reason: **${kickReason}**`
    );
    message.channel.send(
      `${kickUser} was successfully kicked from the server. Reason: **${kickReason}**. I have also send a DM letting the person know.`
    );
  },
};
