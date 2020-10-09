const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  description: "Get user avatar",
  category: "util",
  execute(bot, message) {
    const user = message.mentions.users.first() || message.author;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = new MessageEmbed()
      .setTitle(`${user.username}'s Avatar`)
      .setFooter(message.author.username)
      .setDescription(`Click __[Here](${avatar})__ to download`)
      .setImage(`${avatar}`)
      .setColor("BLUE")
      .setTimestamp();

    message.channel.send(embed);
  },
};
