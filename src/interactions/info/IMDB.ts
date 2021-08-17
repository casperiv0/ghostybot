import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class IMDBInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "imdb",
      description: "Get information about a series or a movie",
      options: [
        {
          name: "query",
          description: "What you're looking for",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);
    const movie = await this.bot.imdb.get({ name: query }).catch(() => null);

    if (!movie) {
      return interaction.editReply({
        content: lang.UTIL.DB_NOT_FOUND.replace("{search}", query),
      });
    }

    const released = new Date(Number(movie.released)).toLocaleDateString();

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(movie.title)
      .setThumbnail(movie.poster)
      .setDescription(movie.plot)
      .addField(`${lang.UTIL.DB_RATINGS}`, movie.rating.toString(), true)
      .addField(`${lang.UTIL.DB_COUNTRY}`, movie.country, true)
      .addField(`${lang.UTIL.DB_GENRES}`, movie.genres, true)
      .addField(`${lang.UTIL.DB_AWARDS}`, movie.awards, true)
      .addField(`${lang.UTIL.DB_LANGS}`, movie.languages, true)
      .addField(`${lang.UTIL.DB_RELEASED}`, released, true)
      .addField(`${lang.BOT_OWNER.EVAL_TYPE}`, movie.type, true);

    await interaction.editReply({ embeds: [embed] });
  }
}
