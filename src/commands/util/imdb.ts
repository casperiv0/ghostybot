import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ImdbCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "imdb",
      description: "Get the information about series and movie",
      category: "util",
      requiredArgs: [{ name: "query" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    if (!bot.config.imdbKey) return;
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const search = args.join(" ");

    try {
      const movie = await bot.imdb.get({ name: search });
      const released = new Date(Number(movie.released)).toLocaleDateString();

      const embed = bot.utils
        .baseEmbed(message)
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
      console.log(e);

      return message.channel.send(lang.UTIL.DB_NOT_FOUND.replace("{search}", search));
    }
  }
}
