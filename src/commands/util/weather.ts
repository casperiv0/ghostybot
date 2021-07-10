import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";
import { bold } from "@discordjs/builders";

export interface WeatherData {
  weather: { id: number; main: string; description: string; icon: string }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  visibility: number;
  wind: { speed: number; deg: number; gust: number };
  dt: number;
  sys: { type: number; id: number; country: string; sunrise: number; sunset: number };
  timezone: number;
  id: number;
  name: string;
  cod: number | string;
}

export default class WeatherCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "weather",
      description: "See the weather in a country/city",
      category: "util",
      requiredArgs: [{ name: "country/city" }],
    });
  }

  getWindDirection(v: number) {
    if (v === 0) {
      return "North";
    } else if (v > 0 && v < 90) {
      return "North East";
    } else if (v === 90) {
      return "East";
    } else if (v > 90 && v < 180) {
      return "South East";
    } else if (v === 180) {
      return "South";
    } else if (v > 180 && v < 270) {
      return "South West";
    } else if (v === 270) {
      return "West";
    } else if (v > 270 && v < 360) {
      return "North West";
    }

    return "Unknown";
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const query = args.join(" ");

      const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        query,
      )}&appid=${process.env["OPEN_WEATHER_MAP_API_KEY"]}&units=metric`;
      const data: WeatherData = await fetch(url).then((res) => res.json());

      if (data.cod === 401) {
        return message.channel.send({ content: lang.GLOBAL.ERROR });
      }

      if (data.cod === "404") {
        return message.channel.send({
          content: lang.UTIL.C_NOT_FOUND.replace("{query}", query),
        });
      }

      const main = data.weather[0].main.toString();
      const desc = data.weather[0].description.toString();
      const icon = data.weather[0].icon.toString();
      const feelsLike = data.main.feels_like.toString();
      const temp = data.main.temp.toString();
      const windSpeed = data.wind.speed.toString();
      const windDeg = this.getWindDirection(data.wind.deg);

      const country = data.sys.country.toString();
      const flag = `https://www.countryflags.io/${country}/flat/64.png`;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setAuthor(`${data.name} ${lang.UTIL.WEATHER}`, flag)
        .addField(bold(lang.UTIL.MAIN), main, true)
        .addField(bold(lang.UTIL.CURRENT), desc, true)
        .addField(bold(lang.UTIL.CURRENT_TEMP), `${temp}°C`, true)
        .addField(bold(lang.UTIL.FEELS_LIKE), `${feelsLike}°C`, true)
        .addField(bold(lang.UTIL.WIND_SPEED), `${windSpeed}Km/h`, true)
        .addField(bold(lang.UTIL.WIND_DEGREES), windDeg, true)
        .addField(bold(lang.UTIL.COUNTRY), country)
        .setThumbnail(`https://openweathermap.org/img/wn/${icon}@2x.png`);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
