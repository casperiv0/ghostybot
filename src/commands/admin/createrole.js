const { MessageEmbed } = require("discord.js");
const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "createrole",
  description: "This command creates a role with the name of what you say",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("You need `MANAGE_ROLES` permission.");
    }
    const roleName = args[0];

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return errorEmbed("manage roles (Manage Roles)", message);
    }

    if (!roleName) {
      message.channel.send("Please specify a role name!");
    }

    message.guild.roles.create({
      data: {
        name: roleName,
        color: "BLUE",
      },
    });

    const embed = new MessageEmbed()
      .setTitle(`Created Role: ${roleName}`)
      .setDescription(`Successfully created the \`${roleName}\` role`)
      .setColor("BLUE")
      .setTimestamp();
    message.channel.send(embed);
  },
};
