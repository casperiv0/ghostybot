const { imdbKey } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "imdb",
  description: "Get the information about series and movie",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const search = args.join(" ");

    if (!args.length) {
      return message.channel.send(lang.UTIL.PROVIDE_M_S);
    }

    if (imdbKey === "") return;

    try {
      const movie = await bot.imdb.get({ name: search });
      const released = new Date(movie.released).toLocaleDateString();

      const embed = BaseEmbed(message)
        .setTitle(movie.title)
        .setThumbnail(movie.poster)
        .setDescription(movie.plot)
        .addField(`${lang.UTIL.DB_RATINGS}`, movie.rating, true)
        .addField(`${lang.UTIL.DB_COUNTRY}`, movie.country, true)
        .addField(`${lang.UTIL.DB_GENRES}`, movie.genres, true)
        .addField(`${lang.UTIL.DB_AWARDS}`, movie.awards, true)
        .addField(`${lang.UTIL.DB_LANGS}`, movie.languages, true)
        .addField(`${lang.UTIL.DB_RELEASED}`, released, true)
        .addField(`${lang.BOT_OWNER.EVAL_TYPE}`, movie.type, true);

      message.channel.send({ embed });
    } catch (e) {
      return message.channel.send(
        lang.UTIL.DB_NOT_FOUND.replace("{search}", search)
      );
    }
  },
};
