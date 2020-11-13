const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "blowjob",
  category: "nsfw",
  usage: "None",
  nsfwOnly: true,
  async execute(bot, message) {
    const data = await bot.neko.nsfw.blowJob();

    const blowjob = BaseEmbed(message).setImage(data.url).setURL(data.url);
    message.channel.send(blowjob);
  },
};
