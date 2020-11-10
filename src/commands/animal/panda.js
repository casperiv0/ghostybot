const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "panda",
  description: "Shows a picture of a panda",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch(
      "https://some-random-api.ml/img/panda"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
      .setImage(`${data.link}`);

    message.channel.send(embed);
  },
};
