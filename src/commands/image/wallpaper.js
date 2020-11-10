const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "wallpaper",
  description: "good wallpapers xD",
  category: "image",
  async execute(bot, message) {
    const data = await bot.neko.sfw.wallpaper();

    const embed = BaseEmbed(message).setImage(data.url);

    message.channel.send(embed);
  },
};
