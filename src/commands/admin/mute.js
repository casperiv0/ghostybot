const { updateMuteChannelPerms, findOrCreateMutedRole } = require("../../utils/functions");

module.exports = {
  name: "mute",
  description: "Mute a user",
  category: "admin",
  usage: "mute <@user>",
  botPermissions: ["MANAGE_ROLES", "MANAGE_CHANNELS"],
  memberPermissions: ["MANAGE_ROLES"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const muteMember = bot.findMember(message, args);
    let muteReason = args.slice(1).join(" ");
    if (!muteReason) muteReason = lang.GLOBAL.NOT_SPECIFIED;

    if (!muteMember) {
      return message.channel.send(lang.MEMBER.PROVIDE_MEMBER);
    }

    if (muteMember?.roles.cache.find((r) => r.name === "muted")) {
      return message.channel.send(lang.ADMIN.MUTE_ALREADY_MUTED);
    }

    if (muteMember.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(lang.ADMIN.MUTE_CANNOT_MUTE);
    }

    if (message.guild.me.roles.highest.comparePositionTo(muteMember.roles.highest) < 0)
      return message.channel.send(
        lang.ADMIN.MY_ROLE_MUST_BE_HIGHER.replace("{member}", muteMember.user.tag)
      );

    const muteRole = await findOrCreateMutedRole(message.guild);
    updateMuteChannelPerms(message.guild, muteMember.user.id, {
      SEND_MESSAGES: false,
      ADD_REACTIONS: false,
      CONNECT: false,
    });

    // Add role & send msg
    muteMember.roles.add(muteRole);
    muteMember.user.send(
      lang.ADMIN.MUTE_SUCCESS_DM.replace("{guild}", message.guild.name).replace(
        "{reason}",
        muteReason
      )
    );
    message.channel.send(
      lang.ADMIN.MUTE_SUCCESS.replace("{tag}", muteMember.user.tag).replace("{reason}", muteReason)
    );

    await bot.emit("guildMuteAdd", message.guild, {
      member: muteMember,
      executor: message.author,
      tempMute: false,
      reason: muteReason,
    });
  },
};
