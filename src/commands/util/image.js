const cheerio = require("cheerio");
const request = require("request");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "image",
  aliases: ["randomimage", "imagesearch"],
  description: "Search any image you want from google",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const text = args.join(" ");
    if (!text) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const parts = message.content.split(" ");
    const search = parts.slice(1).join(" ");
    const options = {
      url: "http://results.dogpile.com/serp?qc=images&q=" + search,
      method: "GET",
      headers: {
        Accept: "text/html",
        "User-Agent": "Chrome",
      },
    };

    request(options, function (error, _response, responseBody) {
      if (error) {
        return;
      }

      const $ = cheerio.load(responseBody);

      const links = $(".image a.link");

      const urls = new Array(links.length)
        .fill(0)
        .map((v, i) => links.eq(i).attr("href"));

      if (!urls.length) {
        return message.channel.send(lang.UTIL.NO_IMG_FOUND);
      }

      const randomIndex = Math.floor(Math.random() * urls.length);
      const image = urls[randomIndex];
      const embed = BaseEmbed(message).setImage(image);
      message.channel.send(embed);
    });
  },
};
