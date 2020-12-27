module.exports = {
  name: "removeroleall",
  aliases: ["rrall","rroleall","takeroleall"],
  description: "remove a role from all user of the current server",
  category: "admin",
  botPermissions: ["MANAGE_ROLES"],
  memberPermissions: ["MANAGE_ROLES"],
  requiredArgs: ["role"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(1)
      ) || message.mentions.roles.first() || message.guild.roles.cache.get(args.join(" ").slice(1));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(lang.ROLES.MY_ROLE_NOT_HIGH_ENOUGH.replace("{role}", role.name));
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(lang.ROLES.YOUR_ROLE_MUST_BE_HIGHER.replace("{role}", role.name));
    }
    
    if (!role) {
      return message.channel.send(lang.REACTIONS.NO_ROLE);
    }

    message.guild.members.cache.forEach(member => member.roles.remove(role));

    message.channel.send(lang.ADMIN.REMOVED_ROLE_EVERYONE.replace("{roleName}", role.name));
  },
};
