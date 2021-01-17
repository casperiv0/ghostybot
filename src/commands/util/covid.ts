import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CovidCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "covid",
      description: "Get covid 19 information",
      category: "util",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const query = args.join("");
      let country = await (
        await fetch("https://disease.sh/v3/covid-19/countries/" + encodeURIComponent(query))
      ).json();
      if (!query) country = await (await fetch("https://disease.sh/v3/covid-19/all")).json();
  
      if (country.message) {
        return message.channel.send(lang.COVID.NOT_FOUND);
      }
      const { tz, date } = await bot.utils.formatDate(country.updated, message.guild?.id);
      const Title = country.country ? `Covid: ${country.country}` : "Covid";
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(Title)
        .addField(
          lang.COVID.TOTAL,
          `
  **${lang.COVID.CASES}:** ${bot.utils.formatNumber(country.cases)}
  **${lang.COVID.RECOVERED}:** ${bot.utils.formatNumber(country.recovered)}
  **${lang.COVID.DEATHS}:** ${bot.utils.formatNumber(country.deaths)}
  **${lang.COVID.TOTAL_POP}:** ${bot.utils.formatNumber(country.population)}`,
          true
        )
        .addField(
          "Today",
          `
  **${lang.COVID.CASES}:** ${bot.utils.formatNumber(country.todayCases)}
  **${lang.COVID.RECOVERED}:** ${bot.utils.formatNumber(country.todayRecovered)}
  **${lang.COVID.DEATHS}:** ${bot.utils.formatNumber(country.todayDeaths)}
  `,
          true
        )
        .addField(lang.COVID.CRITICAL, bot.utils.formatNumber(country.critical), true)
        .addField(lang.COVID.TESTS, bot.utils.formatNumber(country.tests), true)
        .setThumbnail(country.countryInfo?.flag || "")
        .setFooter(
          `${lang.COVID.LAST_UPDATED}: ${date} (${tz})`,
          message.author.displayAvatarURL({ dynamic: true })
        );
  
      return message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
