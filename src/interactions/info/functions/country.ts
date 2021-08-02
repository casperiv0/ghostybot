import fetch from "node-fetch";
import * as DJS from "discord.js";
import { bold } from "@discordjs/builders";
import Bot from "structures/Bot";

export async function country(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const countryQuery = interaction.options.getString("country", true);

  const data = await fetch(
    `https://restcountries.eu/rest/v2/name/${encodeURIComponent(countryQuery)}`,
  ).then((r) => r.json());

  const [country] = data;

  if (data.message || !country) {
    return interaction.editReply({ content: lang.COVID.NOT_FOUND });
  }

  const name = country.name || "N/A";
  const nativeName = country.nativeName || "N/A";
  const domains = country.topLevelDomain?.join(", ") || "N/A";
  const callingCodes = country.callingCodes?.join(", ") || "N/A";
  const alphaCode = country.alpha2Code || "N/A";
  const capital = country.capital || "N/A";
  const timezones = country.timezones?.join(", ") || "N/A";
  const region = country.region || "N/A";
  const population = bot.utils.formatNumber(country.population);
  const languages = country.languages.map((v) => v.name).join(", ");

  const flag = `https://www.countryflags.io/${alphaCode}/flat/64.png`;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setAuthor(name)
    .setTitle(nativeName)

    .setDescription(
      `
${bold(lang.UTIL.ALPHA_CODE)}: ${alphaCode}
${bold(lang.GUILD.REGION)}: ${region}
${bold(lang.UTIL.CAPITAL)}: ${capital}
${bold(lang.UTIL.POPULATION)}: ${population}
`,
    )
    .addField(lang.UTIL.CALLING_CODES, callingCodes, true)
    .addField(lang.UTIL.DOMAINS, domains, true)
    .addField(lang.UTIL.DB_LANGS, languages, true)
    .addField(lang.UTIL.TIMEZONES, timezones, false)
    .setThumbnail(flag);

  await interaction.editReply({ embeds: [embed] });
}
