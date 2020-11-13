const fetch = require("node-fetch");
const { openWeatherMapKey } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "weather",
  description: "See the weather in a country/city",
  category: "util",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const query = args.join(" ");

    if (!query) {
      return message.channel.send(lang.UTIL.PROVIDE_COUNTRY);
    }

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      query
    )}&appid=${openWeatherMapKey}&units=metric`;
    const data = await fetch(url).then((res) => res.json());

    if (data.cod === 401) {
      return message.channel.send(lang.GLOBAL.ERROR);
    }

    if (data.cod === "404") {
      return message.channel.send(
        lang.UTIL.C_NOT_FOUND.replace("{query}", query)
      );
    }

    const main = data.weather[0].main;
    const desc = data.weather[0].description;
    const feelsLike = data.main.feels_like;
    const temp = data.main.temp;
    const windSpeed = data.wind.speed;
    const windDeg = data.wind.deg;
    const country = data.sys.country;

    const embed = BaseEmbed(message)
      .setTitle(`${data.name} ${lang.UTIL.WEATHER}`)
      .addField(`**${lang.UTIL.MAIN}**`, main, true)
      .addField(`**${lang.UTIL.CURRENT}**`, desc, true)
      .addField(`**${lang.UTIL.CURRENT_TEMP}**`, `${temp}°C`, true)
      .addField(`**${lang.UTIL.FEELS_LIKE}**`, `${feelsLike}°C`, true)
      .addField(`**${lang.UTIL.WIND_SPEED}**`, `${windSpeed}Km/h`, true)
      .addField(`**${lang.UTIL.WIND_DEGREES}**`, windDeg, true)
      .addField(`**${lang.UTIL.COUNTRY}**`, country)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
