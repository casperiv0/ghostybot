const PlayStore = require("google-play-scraper");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "playstore",
  aliases: ["ps"],
  description: "Show Playstore Application Information Of Your Given Name!",
  usage: "playstore <Application Name>",
  category: "util",
  async execute(bot, message, args) {
    const search = args.join(" ");

    if (!search) return message.channel.send("Please provide search query");

    PlayStore.search({
      term: args.join(" "),
      num: 1,
    }).then((Data) => {
      let App;

      try {
        App = JSON.parse(JSON.stringify(Data[0]));
      } catch (error) {
        return message.channel.send("No Application Found!");
      }

      const Embed = BaseEmbed(message)
        .setThumbnail(App.icon)
        .setURL(App.url)
        .setTitle(`${App.title}`)
        .setDescription(App.summary)
        .addField("Price", App.priceText, true)
        .addField("Developer", App.developer, true)
        .addField("Score", App.scoreText, true);

      return message.channel.send(Embed);
    });
  },
};
