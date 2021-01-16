const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "koala",
  description: "Shows a random picture of koala",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.utils.getGuildLang(message.guild.id);
    const data = await fetch(
      "https://some-random-api.ml/img/koala"
    ).then((res) => res.json());

    const embed = bot.utils.baseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
      .setImage(data.link);

    message.channel.send(embed);
  },
};
