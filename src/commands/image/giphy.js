const { giphyApiKey } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");
const fetch = require("node-fetch");

module.exports = {
  name: "giphy",
  description: "Return a giphy image",
  category: "image",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);

    if (!giphyApiKey) {
      message.channel.send(lang.IMAGE.NO_GIPHY_KEY);
    }

    const api_key = giphyApiKey;
    const q = encodeURIComponent(args.join(" "));
    const limit = 1;
    const rating = "pg-13";
    const randomInt = Math.floor(Math.random() * 100);
    const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&lang=en&rating=${rating}&limit=${limit}&offset=${randomInt}`;
    const res = await (await fetch(url)).json();
    const data = res.data[0];

    if (!data) {
      return message.channel.send(lang.IMAGE.NO_GPIHY_FOUND);
    }

    const image = data.images.original.url;

    const embed = BaseEmbed(message)
      .setTitle(data.title)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(`${image}`);

    return message.channel.send(embed);
  },
};
