const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "bird",
  description: "Returns an image of a bird",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await (
      await fetch("https://some-random-api.ml/img/birb")
    ).json();

    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
      .setImage(`${data.link}`);

    message.channel.send(embed);
  },
};
