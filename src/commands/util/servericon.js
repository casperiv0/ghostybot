const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "servericon",
  description: "Shows the server icon",
  category: "util",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const icon = message.guild.iconURL({ dynamic: true, size: 2048 });
    if (icon === null) {
      message.channel.send(lang.UTIL.NO_GUILD_ICON);
    } else {
      const embed = BaseEmbed(message).setImage(icon);

      message.channel.send(embed);
    }
  },
};
