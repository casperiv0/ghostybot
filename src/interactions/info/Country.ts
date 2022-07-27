import * as DJS from "discord.js";
import { bold } from "@discordjs/builders";
import { request } from "undici";
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

    const countryQuery = interaction.options.getString("country", true);

    const data = await request(`${this.APIs.Country}${encodeURIComponent(countryQuery)}`).then(
      (r) => r.body.json(),
    );

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
      .setAuthor({ name })
      .setTitle(nativeName)

      .setDescription(
        `
${bold(lang.UTIL.ALPHA_CODE)}: ${alphaCode}
${bold(lang.GUILD.REGION)}: ${region}
${bold(lang.UTIL.CAPITAL)}: ${capital}
${bold(lang.UTIL.POPULATION)}: ${population}
`,
      )
      .addFields(
        { name: lang.UTIL.CALLING_CODES, value: callingCodes, inline: true },
        {
          name: lang.UTIL.DOMAINS,
          value: domains,
          inline: true,
        },
        { name: lang.UTIL.DB_LANGS, value: languages, inline: true },
        { name: lang.UTIL.TIMEZONES, value: timezones, inline: false },
      )
      .setThumbnail(flag);

    await interaction.editReply({ embeds: [embed] });
  }
}
