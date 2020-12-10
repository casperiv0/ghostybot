const {
  updateMuteChannelPerms,
  findOrCreateMutedRole,
} = require("../../utils/functions");

module.exports = {
  name: "mute",
  description: "Mute a user",
  category: "admin",
  usage: "mute <@user>",
  botPermissions: ["MANAGE_ROLES"],
  memberPermissions: ["MANAGE_ROLES"],
  async execute(bot, message, args) {
    const muteMember = bot.findMember(message, args);

    if (!muteMember) {
      return message.channel.send("Please provide valid a member");
    }

    if (muteMember?.roles.cache.find((r) => r.name === "muted")) {
      return message.channel.send("User is already muted!");
    }

    if (muteMember.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("User can't be muted");
    }

    if (
      message.guild.me.roles.highest.comparePositionTo(
        muteMember.roles.highest
      ) < 0
    )
      return message.channel.send(
        `My role must be higher than **${muteMember.user.tag}** highest role!`
      );

    let muteReason = args.slice(1).join(" ");

    if (!muteMember) return message.channel.send("User wasn't found");
    if (!muteReason) muteReason = "Not Specified";

    const muteRole = await findOrCreateMutedRole(message.guild);
    updateMuteChannelPerms(message.guild, muteMember.user.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      CONNECT: false,
    });

    // Add role & send msg
    muteMember.roles.add(muteRole);
    muteMember.user.send(
      `You've been **muted** from **${message.guild.name}**, Reason: **${muteReason}**`
    );
    message.channel.send(
      `**${muteMember.user.tag}** was successfully muted from the server. Reason: **${muteReason}**. I have also send a DM letting the person know.`
    );

    await bot.emit("guildMuteAdd", message.guild, {
      member: muteMember,
      executor: message.author,
      tempMute: false,
      reason: muteReason,
    });
  },
};
