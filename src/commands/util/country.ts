import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class CountryCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "country",
      description: "Get information about a country",
      usage: "<country>",
      category: "util",
      requiredArgs: [{ name: "country" }],
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const query = args.join(" ");
      const data = await fetch(
        `https://restcountries.eu/rest/v2/name/${encodeURIComponent(query)}`,
      ).then((r) => r.json());

      const country = data?.country;

      if (data.message || !country) {
        return message.channel.send({ content: lang.COVID.NOT_FOUND });
      }

      const name = country.name || "N/A";
      const nativeName = country.nativeName || "N/A";
      const domains = country.topLevelDomain?.join("\n") || "N/A";
      const callingCodes = country.callingCodes?.join("\n") || "N/A";
      const alphaCode = country.alpha2Code || "N/A";
      const capital = country.capital || "N/A";
      const timezones = country.timezones?.join(", ") || "N/A";
      const region = country.region || "N/A";
      const population = this.bot.utils.formatNumber(country.population);
      const languages = country.languages.map((v) => v.name).join("\n");

      const flag = `https://www.countryflags.io/${alphaCode}/flat/64.png`;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setAuthor(name)
        .setTitle(nativeName)
        .addField(lang.UTIL.ALPHA_CODE, alphaCode, true)
        .addField(lang.UTIL.CALLING_CODES, callingCodes, true)
        .addField(lang.GUILD.REGION, region, true)
        .addField(lang.UTIL.DOMAINS, domains, true)
        .addField(lang.UTIL.CAPITAL, capital, true)
        .addField(lang.UTIL.DB_LANGS, languages, true)
        .addField(lang.UTIL.POPULATION, population, true)
        .addField(lang.UTIL.TIMEZONES, timezones, false)
        .setThumbnail(flag);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
