import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class WeatherCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "weather",
      description: "See the weather in a country/city",
      category: "util",
      requiredArgs: [{ name: "country/city" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const query = args.join(" ");

      const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
        query
      )}&appid=${bot.config.openWeatherMapKey}&units=metric`;
      const data = await fetch(url).then((res) => res.json());

      if (data.cod === 401) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }

      if (data.cod === "404") {
        return message.channel.send(lang.UTIL.C_NOT_FOUND.replace("{query}", query));
      }

      const main = data.weather[0].main;
      const desc = data.weather[0].description;
      const icon = data.weather[0].icon;
      const feelsLike = data.main.feels_like;
      const temp = data.main.temp;
      const windSpeed = data.wind.speed;
      const windDeg = data.wind.deg;
      const country = data.sys.country;

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${data.name} ${lang.UTIL.WEATHER}`)
        .addField(`**${lang.UTIL.MAIN}**`, main, true)
        .addField(`**${lang.UTIL.CURRENT}**`, desc, true)
        .addField(`**${lang.UTIL.CURRENT_TEMP}**`, `${temp}°C`, true)
        .addField(`**${lang.UTIL.FEELS_LIKE}**`, `${feelsLike}°C`, true)
        .addField(`**${lang.UTIL.WIND_SPEED}**`, `${windSpeed}Km/h`, true)
        .addField(`**${lang.UTIL.WIND_DEGREES}**`, windDeg, true)
        .addField(`**${lang.UTIL.COUNTRY}**`, country)
        .setThumbnail(`https://openweathermap.org/img/wn/${icon}@2x.png`);

      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
