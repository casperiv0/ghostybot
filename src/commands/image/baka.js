const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "baka",
  description: "None",
  category: "image",
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const data = await bot.neko.sfw.baka();

    const embed = bot.utils.baseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
