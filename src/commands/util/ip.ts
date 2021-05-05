import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

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

export default class IpLookupCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "ip",
      description: "Search an IP",
      category: "util",
      requiredArgs: [{ name: "ip" }],
      aliases: ["ip-lookup"],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const [ip] = args;
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
          .baseEmbed(message)
          .setTitle(`${city}/${region} - ${country}`)
          .setDescription(
            `
**IP:** ${ip}
**${lang.BOT_OWNER.EVAL_TYPE}:** ${type}
**${lang.UTIL.IP_LON_LAT}:** ${latitude}/${longitude}
**${lang.UTIL.IP_ISP}:** ${isp}
**${lang.UTIL.IP_ORG}:** ${org}
**${lang.UTIL.IP_TIMEZONE}:** ${timezone}
`,
          )
          .setThumbnail(flag);

        return message.channel.send(embed);
      } else {
        return message.channel.send(lang.UTIL.IP_NOT_FOUND);
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
