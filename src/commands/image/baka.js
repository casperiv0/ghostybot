const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "baka",
  description: "None",
  category: "image",
  async execute(bot, message) {
    const data = await bot.neko.sfw.baka();

    const embed = BaseEmbed(message)
      .setDescription(`[Click here if the image failed to load.](${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
