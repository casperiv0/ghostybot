const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "boobs",
  description: "None",
  category: "nsfw",
  nsfwOnly: true,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch(
      "http://api.oboobs.ru/boobs/0/1/random"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(http://media.oboobs.ru/${data[0].preview})`
      )
      .setImage(`http://media.oboobs.ru/${data[0].preview}`);

    message.channel.send(embed);
  },
};
