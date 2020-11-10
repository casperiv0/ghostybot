const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "owl",
  description: "Shows a picture of a owl",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch("http://pics.floofybot.moe/owl").then((res) =>
      res.json()
    );

    const embed = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.image})`
      )
      .setImage(`${data.image}`);

    message.channel.send(embed);
  },
};
