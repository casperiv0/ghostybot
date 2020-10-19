const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "servericon",
  description: "Shows the server icon",
  category: "util",
  execute(bot, message) {
    const icon = message.guild.iconURL({ dynamic: true, size: 2048 });
if (icon === null) {
message.channel.send("The server has no icon")
} else {
  
    const embed = new MessageEmbed()
      .setTitle(`${message.guild.name}'s icon`)
      .setTimestamp()
      .setImage(icon)
      .setFooter(message.author.username)
      .setColor("BLUE");

    message.channel.send(embed);
  
  /* or message.channel.send(new MessageEmbed()
      .setTitle(`${message.guild.name}'s icon`)
      .setTimestamp()
      .setImage(icon)
      .setFooter(message.author.username)
      .setColor("BLUE"))
   */
    }
  },
};
