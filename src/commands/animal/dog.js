const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "dog",
  description: "Shows a picture of a dog",
  category: "animal",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch(
      "https://dog.ceo/api/breeds/image/random"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`
      )
      .setImage(`${data.message}`);

    message.channel.send(embed);
  },
};
