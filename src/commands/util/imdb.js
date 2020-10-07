const { MessageEmbed } = require("discord.js");
const { imdbKey } = require("../../../config.json");

module.exports = {
  name: "imdb",
  description: "Get the information about series and movie",
  category: "util",
  async execute(bot, message, args) {
    const search = args.join(" ");

    if (!args.length) {
      return message.channel.send("Please give the name of movie or series");
    }

    if (imdbKey === "") {
      return message.channel.send("imdbKey is required for this command.");
    }

    try {
      const movie = await bot.imdb.get({ name: search });

      const embed = new MessageEmbed()
        .setTitle(movie.title)
        .setColor("BLUE")
        .setThumbnail(movie.poster)
        .setDescription(movie.plot)
        .setFooter(`Ratings: ${movie.rating}`)
        .addField("Country", movie.country, true)
        .addField("Languages", movie.languages, true)
        .addField("Type", movie.type, true);

      message.channel.send({ embed });
    } catch (e) {
      return message.channel.send(`No movie was found with ${search}`);
    }
  },
};
