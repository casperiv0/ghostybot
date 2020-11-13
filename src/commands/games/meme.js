const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "meme",
  description: "Returns a meme",
  category: "games",
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    const data = await fetch(
      "https://meme-api.herokuapp.com/gimme"
    ).then((res) => res.json());

    const embed = BaseEmbed(message)
      .setTitle(data.title)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${data.url}`);

    message.channel.send(embed);
  },
};
