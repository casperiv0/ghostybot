import * as DJS from "discord.js";
import fetch from "node-fetch";
import { time } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class CovidInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "covid",
      description: "Get COVID-19 information",
      options: [
        {
          name: "country",
          description: "The country you want extra information of",
          type: "STRING",
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const query = interaction.options.getString("country");

    let country: any;

    if (!query) {
      country = await (await fetch(this.APIs.Covid)).json();
    } else {
      country = await (
        await fetch(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(query)}`)
      ).json();
    }

    if (country.message) {
      return interaction.editReply({ content: lang.COVID.NOT_FOUND });
    }

    const title = country.country ? `Covid: ${country.country}` : "Covid";

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(title)
      .addField(
        lang.COVID.TOTAL,
        `
**${lang.COVID.CASES}:** ${this.bot.utils.formatNumber(country.cases)}
**${lang.COVID.RECOVERED}:** ${this.bot.utils.formatNumber(country.recovered)}
**${lang.COVID.DEATHS}:** ${this.bot.utils.formatNumber(country.deaths)}
**${lang.COVID.TOTAL_POP}:** ${this.bot.utils.formatNumber(country.population)}`,
        true,
      )
      .addField(
        "Today",
        `
**${lang.COVID.CASES}:** ${this.bot.utils.formatNumber(country.todayCases)}
**${lang.COVID.RECOVERED}:** ${this.bot.utils.formatNumber(country.todayRecovered)}
**${lang.COVID.DEATHS}:** ${this.bot.utils.formatNumber(country.todayDeaths)}
    `,
        true,
      )
      .addField(lang.COVID.CRITICAL, this.bot.utils.formatNumber(country.critical), true)
      .addField(lang.COVID.TESTS, this.bot.utils.formatNumber(country.tests), true)
      .setThumbnail(country.countryInfo?.flag || "")
      .setFooter(
        `${lang.COVID.LAST_UPDATED}: ${time(new Date(country.updated), "f")}`,
        interaction.user.displayAvatarURL({ dynamic: true }),
      );

    await interaction.editReply({ embeds: [embed] });
  }
}
