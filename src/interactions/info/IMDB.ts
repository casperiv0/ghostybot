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
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);
    const movie = await this.bot.imdb.get({ name: query }).catch(() => null);

    if (!movie) {
      return interaction.editReply({
        content: this.bot.utils.translate(lang.UTIL.DB_NOT_FOUND, { search: query }),
      });
    }

    const released = new Date(Number(movie.released)).toLocaleDateString();

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(movie.title)
      .setThumbnail(movie.poster)
      .setDescription(movie.plot)
      .addFields(
        {
          name: `${lang.UTIL.DB_RATINGS}`,
          value: movie.rating.toString(),
          inline: true,
        },
        {
          name: `${lang.UTIL.DB_COUNTRY}`,
          value: movie.country,
          inline: true,
        },
        {
          name: `${lang.UTIL.DB_GENRES}`,
          value: movie.genres,
          inline: true,
        },
        {
          name: `${lang.UTIL.DB_AWARDS}`,
          value: movie.awards,
          inline: true,
        },
        {
          name: `${lang.UTIL.DB_LANGS}`,
          value: movie.languages,
          inline: true,
        },
        {
          name: `${lang.UTIL.DB_RELEASED}`,
          value: released,
          inline: true,
        },
        {
          name: `${lang.BOT_OWNER.EVAL_TYPE}`,
          value: movie.type,
          inline: true,
        },
      );

    await interaction.editReply({ embeds: [embed] });
  }
}
