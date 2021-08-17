import * as DJS from "discord.js";
import PlayStore, { IAppItem } from "google-play-scraper";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class PlaystoreInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "playstore",
      description: "Show information about an app on the PlayStore",
      options: [
        {
          name: "query",
          description: "The search query",
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
    const data = await PlayStore.search({
      term: query,
      num: 1,
    });

    let app: IAppItem;

    try {
      app = JSON.parse(JSON.stringify(data[0]));
    } catch (error) {
      return interaction.editReply({ content: lang.UTIL.PS_NOT_FOUND });
    }

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setThumbnail(app.icon)
      .setURL(app.url)
      .setTitle(`${app.title}`)
      .setDescription(app.summary)
      .addField(lang.ECONOMY.PRICE, app.priceText, true)
      .addField(lang.UTIL.DEVELOPER, app.developer, true)
      .addField(lang.UTIL.SCORE, app.scoreText, true);

    await interaction.editReply({ embeds: [embed] });
  }
}
