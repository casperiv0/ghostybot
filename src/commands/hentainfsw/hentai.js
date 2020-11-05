const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "hentai",
  category: "hentainsfw",
  description: "None",
  nsfwOnly: true,
  async execute(bot, message) {
    const data = await bot.neko.nsfw.randomHentaiGif();

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send({ embed });
  },
};
