const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "anime",
  description: "description",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const search = args.join(" ");

    if (!search) {
      return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
    }

    const msg = await message.channel.send(`${lang.UTIL.SEARCHING}..`);

    const res = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${search}`
    );
    const data = await res.json();

    msg.delete();

    const anime = data.data[0];

    if (!anime) {
      return message.channel.send(lang.UTIL.ANIME_NOT_FOUND);
    }

    const title = anime.attributes.slug;
    const description = anime.attributes.synopsis;
    const thumbnail = anime.attributes.posterImage.original;
    const ratings = anime.attributes.averageRating;
    const episodes = anime.attributes.episodeCount;
    const image = anime.attributes.coverImage.large;

    const embed = BaseEmbed(message)
      .setTitle(title)
      .setDescription(description)
      .addField(lang.UTIL.DB_RATINGS, ratings)
      .addField(lang.UTIL.TOTAL_EPISODES, episodes)
      .setThumbnail(thumbnail)
      .setImage(image);

    return message.channel.send(embed);
  },
};
