module.exports = {
  name: "removerole",
  aliases: ["rr", "rrole", "takerole"],
  description: "Remove a role from a user",
  category: "admin",
  botPermissions: ["MANAGE_ROLES"],
  memberPermissions: ["MANAGE_ROLES"],
  requiredArgs: ["member", "role"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const needsRole = bot.findMember(message, args);
    const role =
      message.guild.roles.cache.find((role) => role.name === args.join(" ").slice(23)) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(23));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(lang.ADMIN.MY_ROLE_MUST_BE_HIGHER.replace("{roleName}", role.name));
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(lang.ADMIN.YOUR_ROLE_NOT_HIGHT.replace("{roleName}", role.name));
    }

    if (message.guild.me.roles.highest.comparePositionTo(needsRole.roles.highest) < 0) {
      return message.channel.send(lang.ADMIN.MY_ROLE_MUST_BE_HIGHER2.replace("{needsRoleTag}", needsRole.tag));
    }

    if (!needsRole) {
      return message.channel.send(lang.ADMIN.USER_WAS_NOT_FOUND);
    }

    if (!role) {
      return message.channel.send(lang.REACTIONS.NO_ROLE);
    }

    needsRole.roles.remove(role.id);

    message.channel.send(lang.ADMIN.REMOVED_ROLE.replace("{roleName}", role.name).replace("{needsRole}", needsRole));
  },
};
