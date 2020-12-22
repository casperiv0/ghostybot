const fetch = require("node-fetch");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "covid",
  description: "Get covid 19 information",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const query = args.join("");

    let country = await (
      await fetch("https://disease.sh/v3/covid-19/countries/" + encodeURIComponent(query))
    ).json();
    if (!query) country = await (await fetch("https://disease.sh/v3/covid-19/all")).json();

    if (country.message) {
      return message.channel.send(lang.COVID.NOT_FOUND);
    }
    const { tz, date } = await bot.formatDate(country.updated, message.guild.id);
    const Title = country.country ? `Covid: ${country.country}` : "Covid";

    const embed = BaseEmbed(message)
      .setTitle(Title)
      .addField(
        lang.COVID.TOTAL,
        `
**${lang.COVID.CASES}:** ${bot.formatNumber(country.cases)}
**${lang.COVID.RECOVERED}:** ${bot.formatNumber(country.recovered)}
**${lang.COVID.DEATHS}:** ${bot.formatNumber(country.deaths)}
**${lang.COVID.TOTAL_POP}:** ${bot.formatNumber(country.population)}`,
        true
      )
      .addField(
        "Today",
        `
**${lang.COVID.CASES}:** ${bot.formatNumber(country.todayCases)}
**${lang.COVID.RECOVERED}:** ${bot.formatNumber(country.todayRecovered)}
**${lang.COVID.DEATHS}:** ${bot.formatNumber(country.todayDeaths)}
`,
        true
      )
      .addField(lang.COVID.CRITICAL, bot.formatNumber(country.critical), true)
      .addField(lang.COVID.TESTS, bot.formatNumber(country.tests), true)
      .setThumbnail(country.countryInfo?.flag || "")
      .setFooter(
        `${lang.COVID.LAST_UPDATED}: ${date} (${tz})`,
        message.author.displayAvatarURL({ dynamic: true })
      );

    return message.channel.send(embed);
  },
};
