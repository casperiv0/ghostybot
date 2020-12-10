const ms = require("ms");
const {
  updateMuteChannelPerms,
  findOrCreateMutedRole,
  updateUserById,
} = require("../../utils/functions");

module.exports = {
  name: "tempmute",
  description: "Temporary mute someone",
  category: "admin",
  botPermissions: ["MANAGE_ROLES"],
  memberPermissions: ["MANAGE_ROLES"],
  usage: "tempmute <user> <time> <reason>",
  async execute(bot, message, args) {
    const muteUser = message.guild.member(
      message.mentions.users.first() || message.guild.members.cache.get(args[0])
    );
    const [, time, reason] = args;

    if (!time) {
      return message.channel.send("Please provide a time");
    }

    if (!muteUser) {
      return message.channel.send("Please provide valid a member");
    }

    if (muteUser?.roles.cache.find((r) => r.name === "muted")) {
      return message.channel.send("User is already muted!");
    }

    if (muteUser.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("User can't be muted");
    }

    const muteRole = await findOrCreateMutedRole(message.guild);

    updateMuteChannelPerms(message.guild, muteUser.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      CONNECT: false,
    });

    muteUser.roles.add(muteRole);
    await updateUserById(muteUser.id, message.guild.id, {
      mute: {
        muted: true,
        ends_at: Date.now() + ms(time),
        time: time,
      },
    });

    muteUser.user.send(
      `You've been **temporary muted** from **${message.guild.name}**, Reason: **${reason}**, Time: **${time}**`
    );
    message.channel.send(
      `${muteUser} was successfully muted for ${time}. Reason: **${
        reason || "N/A"
      }**`
    );
  },
};
