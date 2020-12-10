module.exports = {
  name: "kick",
  description: "Kick a user",
  category: "admin",
  botPermissions: ["KICK_MEMBERS"],
  memberPermissions: ["KICK_MEMBERS"],
  async execute(bot, message, args) {
    const kickMember = bot.findMember(message, args);
    let kickReason = args.slice(1).join(" ");

    if (!kickMember) {
      return message.channel.send("User wasn't found");
    }

    if (!kickReason) kickReason = "Not Specified";

    if (!kickMember.kickable || kickMember.hasPermission("KICK_MEMBERS")) {
      return message.channel.send("That person can't be kicked!");
    }

    if (
      message.guild.me.roles.highest.comparePositionTo(
        kickMember.roles.highest
      ) < 0
    ) {
      return message.channel.send(
        `My role must be higher than **${kickMember.user.tag}** highest role!`
      );
    }

    kickMember.kick(kickReason);

    kickMember.user.send(
      `You've been **kicked** from **${message.guild.name}**, Reason: **${kickReason}**`
    );
    message.channel.send(
      `**${kickMember.user.tag}** was successfully kicked from the server. Reason: **${kickReason}**. I have also send a DM letting the person know.`
    );

    await bot.emit("guildKickAdd", message.guild, {
      member: kickMember,
      executor: message.author,
      reason: kickReason,
    });
  },
};
