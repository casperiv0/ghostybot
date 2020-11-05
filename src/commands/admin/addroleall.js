module.exports = {
  name: "addroleall",
  aliases: ["arall", "aroleall", "giveroleall"],
  description: "Add a role to all user of the current server",
  category: "admin",
  memberPermissions: ["MANAGE_ROLES", "ADMINISTRATOR"],
  botPermissions: ["MANAGE_ROLES"],
  async execute(bot, message, args) {
    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(1)
      ) ||
      message.mentions.roles.first() ||
      message.guild.roles.cache.get(args.join(" ").slice(1));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(
        `My role is not high enough than **${role.name}** role!`
      );
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(
        `Your role must be higher than **${role.name}** role!`
      );
    }

    if (!role) {
      return message.channel.send("Please provide a valid role");
    }

    message.guild.members.cache.forEach((member) => member.roles.add(role));

    message.channel.send(`Successfully Added **${role.name}** to Everyone`);
  },
};
