const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "hentai",
  category: "hentainsfw",
  description: "None",
  async execute(bot, message) {
    if (!message.channel.nsfw)
      return message.channel.send("This channel is not a NSFW channel!");

    const data = await bot.neko.nsfw.randomHentaiGif();

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send({ embed });
  },
};
