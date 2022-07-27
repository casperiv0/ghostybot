import * as DJS from "discord.js";
import { request } from "undici";
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
          type: DJS.ApplicationCommandOptionType.String,
          required: false,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const query = interaction.options.getString("country");

    let country: any;

    if (!query) {
      country = await (await request(this.APIs.Covid)).body.json();
    } else {
      country = await (
        await request(`https://disease.sh/v3/covid-19/countries/${encodeURIComponent(query)}`)
      ).body.json();
    }

    if (country.message) {
      return interaction.editReply({ content: lang.COVID.NOT_FOUND });
    }

    const title = country.country ? `Covid: ${country.country}` : "Covid";

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(title)
      .addFields(
        {
          name: lang.COVID.TOTAL,
          value: `
**${lang.COVID.CASES}:** ${this.bot.utils.formatNumber(country.cases)}
**${lang.COVID.RECOVERED}:** ${this.bot.utils.formatNumber(country.recovered)}
**${lang.COVID.DEATHS}:** ${this.bot.utils.formatNumber(country.deaths)}
**${lang.COVID.TOTAL_POP}:** ${this.bot.utils.formatNumber(country.population)}`,
          inline: true,
        },
        {
          name: "Today",
          value: `
**${lang.COVID.CASES}:** ${this.bot.utils.formatNumber(country.todayCases)}
**${lang.COVID.RECOVERED}:** ${this.bot.utils.formatNumber(country.todayRecovered)}
**${lang.COVID.DEATHS}:** ${this.bot.utils.formatNumber(country.todayDeaths)}
`,
          inline: true,
        },
        {
          name: lang.COVID.CRITICAL,
          value: this.bot.utils.formatNumber(country.critical),
          inline: true,
        },
        { name: lang.COVID.TESTS, value: this.bot.utils.formatNumber(country.tests), inline: true },
      )
      .setThumbnail(country.countryInfo?.flag || "")
      .setFooter({
        text: `${lang.COVID.LAST_UPDATED}: ${time(new Date(country.updated), "f")}`,
        iconURL: interaction.user.displayAvatarURL(),
      });

    await interaction.editReply({ embeds: [embed] });
  }
}
