const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "avatar",
  description: "Get user avatar",
  category: "util",
  execute(bot, message, args) {
    const user =
      message.mentions.users.first() ||
      message.guild.members.cache.get(args[0])?.user ||
      message.author;

    const avatar = user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = BaseEmbed(message)
      .setTitle(`${user.username}'s Avatar`)
      .setDescription(`Click __[Here](${avatar})__ to download`)
      .setImage(`${avatar}`);

    message.channel.send(embed);
  },
};
