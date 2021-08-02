import fetch from "node-fetch";
import * as DJS from "discord.js";
import Bot from "structures/Bot";

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

export async function ip(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const ip = interaction.options.getString("ip", true);

  const data: ReturnResponse = await fetch(
    `https://ipwhois.app/json/${ip}?lang=${lang.UTIL.IP_LOC}`,
  ).then((res) => res.json());

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

    const embed = bot.utils
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
