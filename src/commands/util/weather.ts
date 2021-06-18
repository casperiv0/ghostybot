import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "structures/Command";
import Bot from "structures/Bot";

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
      const windDeg = data.wind.deg.toString();
      const country = data.sys.country.toString();
      const flag = `https://www.countryflags.io/${country}/flat/64.png`;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setAuthor(`${data.name} ${lang.UTIL.WEATHER}`, flag)
        .addField(`**${lang.UTIL.MAIN}**`, main, true)
        .addField(`**${lang.UTIL.CURRENT}**`, desc, true)
        .addField(`**${lang.UTIL.CURRENT_TEMP}**`, `${temp}°C`, true)
        .addField(`**${lang.UTIL.FEELS_LIKE}**`, `${feelsLike}°C`, true)
        .addField(`**${lang.UTIL.WIND_SPEED}**`, `${windSpeed}Km/h`, true)
        .addField(`**${lang.UTIL.WIND_DEGREES}**`, windDeg, true)
        .addField(`**${lang.UTIL.COUNTRY}**`, country)
        .setThumbnail(`https://openweathermap.org/img/wn/${icon}@2x.png`);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
