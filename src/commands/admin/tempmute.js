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
  usage: "<user> <time> <reason>",
  requiredArgs: ["user", "time", "reason"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const muteMember = await bot.findMember(message, args);
    const [, time, ...rest] = args;
    const reason = rest.join(" ") || "N/A";
    const { muted_role_id } = await bot.getGuildById(message.guild.id);
    const muted_role =
      !muted_role_id || muted_role_id === "Disabled"
        ? await findOrCreateMutedRole(message.guild)
        : message.guild.roles.cache.find((r) => r.id === muted_role_id) ||
          (await findOrCreateMutedRole(message.guild));

    if (!muteMember) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
    }

    if (muteMember?.roles.cache.find((r) => r.id === muted_role.id)) {
      return message.channel.send(lang.ADMIN.ALREADY_MUTED);
    }

    if (muteMember.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(lang.ADMIN.CAN_NOT_MUTED);
    }

    if (!ms(time)) {
      return message.channel.send(`${lang.ADMIN.PROVIDE_VALID_TIME} \`2d\`, \`1h\`, ...`);
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

    muteMember.user.send(lang.ADMIN.TEMP_MUTED
      .replace("{guildName}", message.guild.name)
      .replace("{reason}", reason)
      .replace("{time}", time));

    message.channel.send(lang.ADMIN.SUCCES_MUTED
      .replace("{muteMemberTag}", muteMember.user.tag)
      .replace("{time}", time)
      .replace("{reason}", reason));

    await bot.emit("guildMuteAdd", message.guild, {
      member: muteMember,
      executor: message.author,
      tempMute: true,
      reason: reason,
      time,
    });
  },
};
