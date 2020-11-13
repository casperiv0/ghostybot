const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bunny",
  description: "Shows a picture of a bunny",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch(
      "https://api.bunnies.io/v2/loop/random/?media=gif,png"
    ).then((res) => res.json());

    const embed = BaseEmbed()
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.media.gif})`
      )
      .setImage(`${data.media.gif}`);

    message.channel.send(embed);
  },
};
