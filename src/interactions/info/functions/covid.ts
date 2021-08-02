import fetch from "node-fetch";
import * as DJS from "discord.js";
import { time } from "@discordjs/builders";
import Bot from "structures/Bot";

export async function covid(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const query = interaction.options.getString("country");

  let country: any;

  if (!query) {
    country = await (await fetch("https://disease.sh/v3/covid-19/all")).json();
  } else {
    country = await (
      await fetch(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(query)}`)
    ).json();
  }

  if (country.message) {
    return interaction.editReply({ content: lang.COVID.NOT_FOUND });
  }

  const title = country.country ? `Covid: ${country.country}` : "Covid";

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(title)
    .addField(
      lang.COVID.TOTAL,
      `
**${lang.COVID.CASES}:** ${bot.utils.formatNumber(country.cases)}
**${lang.COVID.RECOVERED}:** ${bot.utils.formatNumber(country.recovered)}
**${lang.COVID.DEATHS}:** ${bot.utils.formatNumber(country.deaths)}
**${lang.COVID.TOTAL_POP}:** ${bot.utils.formatNumber(country.population)}`,
      true,
    )
    .addField(
      "Today",
      `
**${lang.COVID.CASES}:** ${bot.utils.formatNumber(country.todayCases)}
**${lang.COVID.RECOVERED}:** ${bot.utils.formatNumber(country.todayRecovered)}
**${lang.COVID.DEATHS}:** ${bot.utils.formatNumber(country.todayDeaths)}
  `,
      true,
    )
    .addField(lang.COVID.CRITICAL, bot.utils.formatNumber(country.critical), true)
    .addField(lang.COVID.TESTS, bot.utils.formatNumber(country.tests), true)
    .setThumbnail(country.countryInfo?.flag || "")
    .setFooter(
      `${lang.COVID.LAST_UPDATED}: ${time(new Date(country.updated), "f")}`,
      interaction.user.displayAvatarURL({ dynamic: true }),
    );

  await interaction.editReply({ embeds: [embed] });
}
