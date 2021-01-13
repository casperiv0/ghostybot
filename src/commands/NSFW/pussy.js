const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "pussy",
  description: "None",
  category: "nsfw",
  nsfwOnly: true,
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const data = await bot.neko.nsfw.pussy();

    const pussy = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`
      )
      .setImage(data.url);

    message.channel.send(pussy);
  },
};
