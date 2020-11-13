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

    const title = anime.attributes.titles;
    const description = anime.attributes.synopsis;
    const thumbnail = anime.attributes.posterImage.original;
    const ratings = anime.attributes.averageRating;
    const episodes = anime.attributes.episodeCount;
    const image = anime.attributes.coverImage.large;
    const startDate = anime.attributes.startDate;
    const endDate = anime.attributes.endDate;
    const type = anime.attributes.subtype;
    const popularityRank = anime.attributes.popularityRank;

    const embed = BaseEmbed(message)
      .setTitle(`${title.en} (${title.en_jp})`)
      .setDescription(description)
      .addField(lang.UTIL.DB_RATINGS, ratings, true)
      .addField(lang.UTIL.TOTAL_EPISODES, episodes, true)
      .addField(lang.UTIL.START_DATE, startDate, true)
      .addField(lang.UTIL.END_DATE, endDate, true)
      .addField(lang.UTIL.POPULARITY_RANK, popularityRank, true)
      .addField(lang.BOT_OWNER.EVAL_TYPE, type, true)
      .setThumbnail(thumbnail)
      .setImage(image);

    return message.channel.send(embed);
  },
};
