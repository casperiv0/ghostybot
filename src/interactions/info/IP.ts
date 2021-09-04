import * as DJS from "discord.js";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class IPInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "ip",
      description: "Get information about an IP address",
      options: [
        {
          name: "ip",
          description: "The IP address you want to lookup",
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

    const ip = interaction.options.getString("ip", true);

    const data = (await fetch(`${this.APIs.IP}${ip}?lang=${lang.UTIL.IP_LOC}`).then((res) =>
      res.json(),
    )) as ReturnResponse;

    if (data.success) {
      const {
        ip,
        type,
        country,
        country_code,
        region,
        city,
        latitude,
        longitude,
        org,
        isp,
        timezone,
      } = data;
      const flag = `https://www.countryflags.io/${country_code}/flat/64.png` || "";

      const embed = this.bot.utils
        .baseEmbed(interaction)
        .setTitle(`${city}/${region} - ${country}`)
        .setDescription(
          `
**IP:** ${ip}
**${lang.BOT_OWNER.EVAL_TYPE}:** ${type}
**${lang.UTIL.IP_LON_LAT}:** ${latitude}/${longitude}
**${lang.UTIL.IP_ISP}:** ${isp}
**${lang.UTIL.IP_ORG}:** ${org || lang.GLOBAL.NONE}
**${lang.UTIL.IP_TIMEZONE}:** ${timezone}
`,
        )
        .setThumbnail(flag);

      await interaction.editReply({ embeds: [embed] });
    }
  }
}

interface ReturnResponse {
  ip: string;
  success: boolean;
  message?: string;
  type: string;
  continent: string;
  continent_code: string;
  country: string;
  country_code: string;
  country_capital: string;
  country_phone: string;
  country_neighbours: string;
  region: string;
  city: string;
  latitude: string;
  longitude: string;
  as: string;
  org: string;
  isp: string;
  timezone: string;
  timezone_name: string;
  timezone_dstOffset: string;
  timezone_gmtOffset: string;
  timezone_gmt: string;
  currency: string;
  currency_code: string;
  currency_symbol: string;
  currency_rates: string;
  currency_plural: string;
  completed_requests: number;
}
