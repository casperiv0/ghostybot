const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "servericon",
  description: "Shows the server icon",
  category: "util",
  execute(bot, message) {
    const icon = message.guild.iconURL({ dynamic: true, size: 2048 });
    if (icon === null) {
      message.channel.send("The server has no icon");
    } else {
      const embed = BaseEmbed(message)
        .setTitle(`${message.guild.name}'s icon`)
        .setImage(icon);
        
      message.channel.send(embed);
    }
  },
};
