const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "avatar",
  description: "Get user avatar",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);

    const avatar = member.user.displayAvatarURL({ dynamic: true, size: 1024 });

    const embed = BaseEmbed(message)
      .setTitle(`${member.user.username} ${lang.UTIL.AVATAR}`)
      .setDescription(`${lang.UTIL.CLICK_TO_DOWNLOAD}(${avatar})`)
      .setImage(`${avatar}`);

    message.channel.send(embed);
  },
};
