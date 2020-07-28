module.exports = {
  name: "mute",
  description: "Mute a user",
  category: "admin",
  usage: "mute <@user>",
  async execute(bot, message, args) {

    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.reply("I don't have the correct permissions to add a role to somebody! (Manage Roles)");

    const muteUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );

    if (muteUser.roles.cache.find((r) => r.name === "muted"))
      return message.channel.send("User is already muted!");

    if (muteUser.hasPermission("MANAGE_ROLES"))
      return message.channel.send("User can't be muted");

    if (!message.member.hasPermission("MANAGE_ROLES"))
      return message.channel.send("You don't have permissions for that!");

    const muteReason = args.join(" ").slice(23);

    const muteRole =
      message.guild.roles.cache.find((r) => r.name === "muted") ||
      (await message.guild.roles.create({
        data: {
          name: "muted",
          color: "GRAY",
        },
        reason: "Mute a user",
      }));

    // overwrite permissions for every channel in the guild
    message.guild.channels.cache.forEach(async (channel) => {
      await channel.overwritePermissions([
        {
          id: muteRole.id,
          deny: ["SEND_MESSAGES", "ADD_REACTIONS"],
        },
      ]);
    });

    // Add role & send msg
    muteUser.roles.add(muteRole);
    muteUser.user.send(
      `You've been **muted** from **${message.guild.name}**, Reason: **${muteReason}**`
    );
    message.channel.send(
      `${muteUser} was successfully muted from the server. Reason: **${muteReason}**. I have also send a DM letting the person know.`
    );
  },
};
