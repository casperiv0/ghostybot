const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "covid",
  description: "Get covid 19 information",
  category: "util",
  requiredArgs: ["country/country code"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const query = args.join("").toLowerCase();

    const data = await (await fetch("https://disease.sh/v3/covid-19/countries/")).json();
    const country = data.find((co) => {
      if (co.country.toLowerCase() === query) return true;
      if (co.countryInfo.iso2?.toLowerCase() === query) return true;
      if (co.countryInfo.iso3?.toLowerCase() === query) return true;

      return false;
    });

    if (!country) {
      return message.channel.send(lang.COVID.NOT_FOUND);
    }
    const { tz, date } = await bot.formatDate(country.updated, message.guild.id);

    const embed = BaseEmbed(message)
      .setTitle(`Covid: ${country.country}`)
      .addField(
        lang.COVID.TOTAL,
        `
**${lang.COVID.CASES}:** ${formatNumber(country.cases)}
**${lang.COVID.RECOVERED}:** ${formatNumber(country.recovered)}
**${lang.COVID.DEATHS}:** ${formatNumber(country.deaths)}
**${lang.COVID.TOTAL_POP}:** ${formatNumber(country.population)}`,
        true
      )
      .addField(
        "Today",
        `
**${lang.COVID.CASES}:** ${formatNumber(country.todayCases)}
**${lang.COVID.RECOVERED}:** ${formatNumber(country.todayRecovered)}
**${lang.COVID.DEATHS}:** ${formatNumber(country.todayDeaths)}
`,
        true
      )
      .addField(lang.COVID.CRITICAL, formatNumber(country.critical), true)
      .addField(lang.COVID.TESTS, formatNumber(country.tests), true)
      .setThumbnail(country.countryInfo.flag)
      .setFooter(
        `${lang.COVID.LAST_UPDATED}: ${date} (${tz})`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    return message.channel.send(embed);
  },
};

function formatNumber(n) {
  return n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}
