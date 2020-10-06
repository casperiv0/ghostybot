const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "servericon",
  description: "Shows the server icon",
  category: "util",
  execute(bot, message) {
    const icon = message.guild.iconURL({ dynamic: true, size: 1024 });

    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s icon`)
      .setTimestamp()
      .setImage(icon)
      .setFooter(message.author.username)
      .setColor("BLUE");

    message.channel.send(embed);
  },
};
