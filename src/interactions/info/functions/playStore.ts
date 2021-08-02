import * as DJS from "discord.js";
import PlayStore, { IAppItem } from "google-play-scraper";
import Bot from "structures/Bot";

export async function playStore(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const query = interaction.options.getString("query", true);

  const data = await PlayStore.search({
    term: query,
    num: 1,
  });

  let app: IAppItem;

  try {
    app = JSON.parse(JSON.stringify(data[0]));
  } catch (error) {
    return interaction.reply({ content: lang.UTIL.PS_NOT_FOUND });
  }

  const embed = bot.utils
    .baseEmbed(interaction)
    .setThumbnail(app.icon)
    .setURL(app.url)
    .setTitle(`${app.title}`)
    .setDescription(app.summary)
    .addField(lang.ECONOMY.PRICE, app.priceText, true)
    .addField(lang.UTIL.DEVELOPER, app.developer, true)
    .addField(lang.UTIL.SCORE, app.scoreText, true);

  await interaction.reply({ embeds: [embed] });
}
