const { MessageEmbed } = require("discord.js");

function BaseEmbed(message) {
  if (!message) {
    throw Error("'message' must be passed down as param! (BaseEmbed)");
  }

  const avatar = message.author.displayAvatarURL({ dynamic: true });
  return new MessageEmbed()
    .setFooter(message.author.username, avatar)
    .setColor("#7289DA")
    .setTimestamp();
}

module.exports = BaseEmbed;
