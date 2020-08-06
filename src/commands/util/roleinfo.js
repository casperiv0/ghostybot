const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../utils/functions");

module.exports = {
  name: "roleinfo",
  description: "Shows info about a role",
  category: "util",
  execute(bot, message, args) {
    const role =
      message.mentions.roles.first() ||
      message.guild.roles.cache.find((role) => role.name === args[0]);

    if (!role) return message.channel.send("Couldn't find that role");

    const createdAt = formatDate(role.createdAt);
    const mentionable = role.mentionable ? "Yes" : "No";
    const name = role.name;
    const id = role.id;
    const color = role.color;

    const embed = new MessageEmbed()
      .setTitle(`**${name}**`)
      .setColor(color)
      .addField("**Created At**", createdAt, true)
      .addField("**Mentionable**", mentionable, true)
      .addField("**Id**", id, true)
      .setTimestamp()
      .setFooter(message.author.username);

    message.channel.send(embed);
  },
};
