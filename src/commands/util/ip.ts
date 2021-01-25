import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

interface ReturnResponse {
  status: string;
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
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
      const data: ReturnResponse = await fetch(`http://ip-api.com/json/${ip}`).then((res) =>
        res.json()
      );

      if (data?.status === "success") {
        const {
          country,
          regionName,
          city,
          zip,
          lon,
          lat,
          isp = "N/A",
          org = "N/A",
          timezone,
          countryCode,
        } = data;
        const flag = `https://www.countryflags.io/${countryCode}/flat/64.png` || "";

        const embed = bot.utils
          .baseEmbed(message)
          .setTitle(`${city}/${regionName} - ${country}`)
          .setDescription(
            `
**ZIP:** ${zip}
**Lon/Lat:** ${lon}/${lat}
**ISP:** ${isp}
**Org:** ${org}
**Timezone:** ${timezone}
`
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
