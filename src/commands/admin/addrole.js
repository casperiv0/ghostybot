module.exports = {
  name: "addrole",
  aliases: ["ar", "arole", "giverole"],
  description: "Add a role to a user",
  category: "admin",
  memberPermissions: ["SEND_MESSAGES", "MANAGE_ROLES", "ADMINISTRATOR"],
  botPermissions: ["MANAGE_ROLES"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const needsRole = bot.findMember(message, args);

    if (!needsRole) {
      return message.channel.send(lang.MEMBER.NOT_FOUND);
    }

    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(23)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(23));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(
        lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name)
      );
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(
        lang.ROLES.YOUR_ROLE_MUST_BE_HIGHER.replace("{role}", role.name)
      );
    }

    if (
      message.guild.me.roles.highest.comparePositionTo(
        needsRole.roles.highest
      ) < 0
    )
      return message.channel.send(
        lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace(
          "{member}",
          needsRole.name
        )
      );

    if (!role) {
      return message.channel.send(lang.ROLES.PROVIDE_ROLE);
    }

    if (needsRole.roles.cache.some((r) => role.id === r.id)) {
      return message.channel.send(lang.ROLES.ALREADY_HAS_ROLE);
    }

    needsRole.roles.add(role.id);

    message.channel.send(
      lang.ROLES.ADDED_ROLE_TO.replace("{role}", role.name).replace(
        "{member}",
        needsRole.user.username
      )
    );
  },
};
