const discord = require("discord.js");

module.exports = {
  name: "anime",
  aliases: ["searchanime", "animesearch"],
  category: "util",
  description: "",
  async execute(bot, message, args) {
    const search = args.join(" ");

    if (!search) return message.channel.send("Please specify the anime movie");

    bot.kitsu
      .fetch(search)
      .then(async (result) => {
        if (result.length === 0)
          return message.channel.send("This is not a valid anime movie");

        let anime = result[0];
        const embed = new discord.MessageEmbed()
          .setColor("BLUE")
          .setAuthor(
            `${anime.titles.english ? anime.titles.english : search} | ${
              anime.showType
            }`,
            anime.posterImage.original
          )
          .setDescription(anime.synopsis.replace(/<[^>]*>/g, "").split("\n")[0])
          .addField(
            "Information",
            `**Japanese Name:** ${anime.titles.romaji}\n**Age Rating:** ${
              anime.ageRating
            }\n**Is it NSFW:** ${anime.nsfw ? "Yes" : "No"}`,
            true
          )
          .addField(
            "Stats",
            `**Avg Rating:** ${anime.averageRating}\n**Rank by rating:** ${anime.ratingRank}\n**Rank by popularity:** ${anime.popularityRank}`,
            true
          )
          .addField(
            "Status",
            `**Episode Count:** ${
              anime.episodeCount ? anime.episodeCount : "N/A"
            }\n`,
            true
          )
          .setThumbnail(anime.posterImage.original, 100, 200);
        return message.channel.send(embed);
      })
      .catch(() => {
        return message.channel.send(`Couldn't find result for ${search}`);
      });
  },
};
