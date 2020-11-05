module.exports = {
  name: "ban",
  description: "ban",
  category: "admin",
  botPermissions: ["BAN_MEMBERS"],
  memberPermissions: ["BAN_MEMBERS"],
  async execute(bot, message, args) {
    const banUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    let banReason = args.join(" ").slice(23);

    if (!banUser) return message.channel.send("User wasn't found");
    if (!banReason) banReason = "Not Specified";

    if (!banUser.bannable || banUser.hasPermission("BAN_MEMBERS")) {
      return message.channel.send("That person can't be banned!");
    }

    if (
      message.guild.me.roles.highest.comparePositionTo(banUser.roles.highest) <
      0
    ) {
      return message.channel.send(
        `My role must be higher than **${banUser.tag}** highest role!`
      );
    }

    banUser.ban({ days: 7, reason: banReason });

    banUser.user.send(
      `You've been **banned** from **${message.guild.name}**, Reason: **${banReason}**`
    );
    message.channel.send(
      `${banUser} was successfully banned from the server. Reason: **${banReason}**. I have also send a DM letting the person know.`
    );
  },
};
