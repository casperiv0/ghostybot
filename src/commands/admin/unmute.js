const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "unmute",
  description: "Unmute a user",
  category: "admin",
  usage: "unmute <@user>",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(
        errorEmbed("manage roles! (Manage Roles)", message)
      );

    const mutedUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel.send("You don't have permissions for that!");

    if (!mutedUser)
      return message.channel.send("Please provide a user mention!");

    const mutedRole = message.guild.roles.cache.find((r) => r.name === "muted");

    if (!mutedUser.roles.cache.some((r) => r.name === "muted"))
      return message.channel.send("User is not muted!");

    // Add role & send msg
    mutedUser.roles.remove(mutedRole);
    message.channel.send(`Successfully unmuted ${mutedUser}`);
  },
};
