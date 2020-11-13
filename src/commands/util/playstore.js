const PlayStore = require("google-play-scraper");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "playstore",
  aliases: ["ps"],
  description: "Show Playstore Application Information Of Your Given Name!",
  usage: "playstore <Application Name>",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const search = args.join(" ");

    if (!search) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    PlayStore.search({
      term: args.join(" "),
      num: 1,
    }).then((Data) => {
      let app;

      try {
        app = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send(lang.UTIL.PS_NOT_FOUND);
      }

      const Embed = BaseEmbed(message)
        .setThumbnail(app.icon)
        .setURL(app.url)
        .setTitle(`${app.title}`)
        .setDescription(app.summary)
        .addField(lang.ECONOMY.PRICE, app.priceText, true)
        .addField(lang.UTIL.DEVELOPER, app.developer, true)
        .addField(lang.UTIL.SCORE, app.scoreText, true);

      return message.channel.send(Embed);
    });
  },
};
