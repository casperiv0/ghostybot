const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "butt",
  description: "None",
  category: "nsfw",
  nsfwOnly: true,
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);
    const data = await fetch(
      "http://api.obutts.ru/butts/0/1/random"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setDescription(
        `${lang.IMAGE.CLICK_TO_VIEW}(http://media.obutts.ru/${data[0].preview})`
      )
      .setImage(`http://media.obutts.ru/${data[0].preview}`);

    message.channel.send(embed);
  },
};
