const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "racoon",
  description: "Shows a picture of racoon",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch("https://some-random-api.ml/img/racoon").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.file})`)
      .setImage(`${data.file}`);

    message.channel.send(embed);
  },
};
