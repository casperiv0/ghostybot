import * as DJS from "discord.js";
import { bold } from "@discordjs/builders";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class CountryInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "country",
      description: "Get information about a country",
      options: [
        {
          name: "country",
          description: "The country you want to get information about",
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

    const countryQuery = interaction.options.getString("country", true);

    const data = (await fetch(`${this.APIs.Country}${encodeURIComponent(countryQuery)}`).then((r) =>
      r.json(),
    )) as any;

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
    const population = this.bot.utils.formatNumber(country.population);
    const languages = country.languages.map((v) => v.name).join(", ");

    const flag = `https://www.countryflags.io/${alphaCode}/flat/64.png`;

    const embed = this.bot.utils
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
}
