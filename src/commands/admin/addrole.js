const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "addrole",
  aliases: ["ar","arole","giverole"],
  description: "Add a role to a user",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.guild.me.hasPermission("MANAGE_ROLES"))
      return message.channel.send(errorEmbed("manage roles (Manage Roles)", message));

    if (!message.member.hasPermission("MANAGE_ROLES" || "ADMINISTRATOR"))
      return message.channel.send("You don't have permissions for that!");

    const needsRole =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[0]);

    const role =
      message.guild.roles.cache.find(
        (role) => role.name === args.join(" ").slice(23)
      ) || message.mentions.roles.first() || message.guild.roles.cache.get(args.join(" ").slice(23));

    if (message.guild.me.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(`My role is not high enough than **${role.name}** role!`);
    }

    if (message.member.roles.highest.comparePositionTo(role) < 0) {
      return message.channel.send(`Your role must be higher than **${role.name}** role!`);
    }

    if (message.guild.me.roles.highest.comparePositionTo(needsRole.roles.highest) < 0)
      return message.channel.send(`My role must be higher than **${needsRole.tag}** highest role!`);

    if (!needsRole) {
      return message.channel.send("User wasn't found");
    }
    
    if (!role) {
      return message.channel.send("Please provide a valid role");
    }

    if (needsRole.roles.cache.some((r) => role.id === r.id)) {
      return message.channel.send("User already has that role");
    }

    needsRole.roles.add(role.id);

    message.channel.send(`Successfully Added **${role.name}** to ${needsRole}`);
  },
};
