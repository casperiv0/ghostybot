const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { openWeatherMapKey } = require("../../../config.json");

module.exports = {
  name: "weather",
  description: "See the weather in a country/city",
  category: "util",
  async execute(bot, message, args) {
    const query = args.join(" ");

    if (!query) return message.channel.send("Please provide a city/country");

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(query)}&appid=${openWeatherMapKey}&units=metric`;
    const data = await fetch(url).then((res) => res.json());
    
    if (data.cod === 401)
        return message.channel.send("API key is invalid or incorrect!");

    if (data.cod === "404")
      return message.channel.send(`City: **${query}** was not found!`);

    const main = data.weather[0].main;
    const desc = data.weather[0].description;
    const feelsLike = data.main.feels_like;
    const temp = data.main.temp;
    const windSpeed = data.wind.speed;
    const windDeg = data.wind.deg;
    const country = data.sys.country;

    const embed = new MessageEmbed()
      .setTitle(`${data.name}'s Weather`)
      .addField("**Main**", main, true)
      .addField("**Current**", desc, true)
      .addField("**Current temp**", `${temp}°C`, true)
      .addField("**Feels like**", `${feelsLike}°C`, true)
      .addField("**Wind speed**", `${windSpeed}Km/h`, true)
      .addField("**Wind degrees**", windDeg, true)
      .addField("**Country**", country)
      .setColor("BLUE")
      .setFooter(message.author.username)
      .setTimestamp();

    message.channel.send({ embed });
  },
};
