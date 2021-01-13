const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "wallpaper",
  description: "good wallpapers xD",
  category: "nsfw",
  nsfwOnly: true,
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const data = await bot.neko.sfw.wallpaper();

    const wallpaper = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`
      )
      .setImage(data.url);

    message.channel.send(wallpaper);
  },
};
