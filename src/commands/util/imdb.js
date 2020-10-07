const { MessageEmbed } = require("discord.js");
const imdb = require("imdb-api");
const { imdbKey } = require("../../../config.json");

module.exports = {
  name: "imdb",
  description: "Get the information about series and movie",
  category: "util",
  async execute(bot, message, args) {

    if (!args.length) return message.channel.send("Please give the name of movie or series");

    const data = new imdb.Client({apiKey: `${imdbKey}`});
    const movie = await data.get({'name': args.join(" ")});
    
    const embed = new MessageEmbed()
      .setTitle(movie.title)
      .setColor("#ff2050")
      .setThumbnail(movie.poster)
      .setDescription(movie.plot)
      .setFooter(`Ratings: ${movie.rating}`)
      .addField("Country", movie.country, true)
      .addField("Languages", movie.languages, true)
      .addField("Type", movie.type, true);
    
    message.channel.send({ embed });
  },
};
