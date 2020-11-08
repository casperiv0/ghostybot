const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "avatar",
  description: "Get user avatar",
  category: "util",
  execute(bot, message, args) {
    const member = bot.findMember(message, args, true);

    const avatar = member.user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = BaseEmbed(message)
      .setTitle(`${member.user.username}'s Avatar`)
      .setDescription(`Click __[Here](${avatar})__ to download`)
      .setImage(`${avatar}`);

    message.channel.send(embed);
  },
};
