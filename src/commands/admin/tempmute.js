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
  botPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_ROLES"],
  usage: "tempmute <user> <time> <reason>",
  async execute(bot, message, args) {
    const muteMember = bot.findMember(message, args);
    const [, time, ...rest] = args;
    const reason = rest.join(" ") || "N/A";

    if (!muteMember) {
      return message.channel.send("Please provide valid a member");
    }

    if (muteMember?.roles.cache.find((r) => r.name === "muted")) {
      return message.channel.send("User is already muted!");
    }

    if (muteMember.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("User can't be muted");
    }

    if (!ms(time)) {
      return message.channel.send("Please provide a valid time: E.G.: `2d`, `1h`, ...");
    }

    const muteRole = await findOrCreateMutedRole(message.guild);

    updateMuteChannelPerms(message.guild, muteMember.user.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      CONNECT: false,
    });

    muteMember.roles.add(muteRole);
    await updateUserById(muteMember.user.id, message.guild.id, {
      mute: {
        muted: true,
        ends_at: Date.now() + ms(time),
        time,
        reason: reason,
      },
    });

    muteMember.user.send(
      `You've been **temporary muted** from **${message.guild.name}**, Reason: **${reason}**, Time: **${time}**`
    );
    message.channel.send(
      `${muteMember.user.tag} was successfully muted for ${time}. Reason: **${reason}**`
    );

    await bot.emit("guildMuteAdd", message.guild, {
      member: muteMember,
      executor: message.author,
      tempMute: true,
      reason: reason,
      time,
    });
  },
};
