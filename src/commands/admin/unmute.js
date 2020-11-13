module.exports = {
  name: "unmute",
  description: "Unmute a user",
  category: "admin",
  usage: "unmute <@user>",
  botPermissions: ["MANAGE_ROLES"],
  memberPermissions: ["MANAGE_ROLES"],
  async execute(bot, message, args) {
    const mutedUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

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
