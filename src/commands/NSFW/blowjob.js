const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "blowjob",
  category: "nsfw",
  nsfwOnly: true,
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const data = await bot.neko.nsfw.blowJob();

    const blowjob = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`
      )
      .setImage(data.url);

    message.channel.send(blowjob);
  },
};
