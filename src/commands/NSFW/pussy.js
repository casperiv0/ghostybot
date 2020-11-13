const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "pussy",
  description: "None",
  category: "nsfw",
  nsfwOnly: true,
  async execute(bot, message) {
    const data = await bot.neko.nsfw.pussy();

    const blowjob = BaseEmbed(message).setImage(data.url).setURL(data.url);
    message.channel.send(blowjob);
  },
};
