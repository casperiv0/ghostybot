const { getUserById, updateUserById } = require("../../utils/functions");

module.exports = {
  name: "unmute",
  description: "Unmute a user",
  category: "admin",
  usage: "unmute <@user>",
  botPermissions: ["MANAGE_ROLES"],
  memberPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  async execute(bot, message, args) {
    const mutedMember = bot.findMember(message, args);
    if (!mutedMember) {
      return message.channel.send("Please provide a user mention!");
    }

    const mutedRole = message.guild.roles.cache.find((r) => r.name === "muted");

    if (!mutedMember.roles.cache.some((r) => r.name === "muted")) {
      return message.channel.send("User is not muted!");
    }

    message.guild.channels.cache.forEach((channel) => {
      channel.permissionOverwrites.get(mutedMember.id)?.delete();
    });

    const { user } = await getUserById(mutedMember.user.id, message.guild.id);
    if (user.mute.muted) {
      await updateUserById(mutedMember.user.id, message.guild.id, {
        mute: {
          muted: false,
          ends_at: null,
          time: null,
        },
      });
    }

    // Add role & send msg
    mutedMember.roles.remove(mutedRole);
    message.channel.send(`Successfully unmuted **${mutedMember.user.tag}**`);

    await bot.emit("guildMuteRemove", message.guild, {
      member: mutedMember,
      executor: message.author,
    });
  },
};
