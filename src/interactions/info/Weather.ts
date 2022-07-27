import process from "node:process";
import { bold } from "@discordjs/builders";
import * as DJS from "discord.js";
import { request } from "undici";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class WeatherInfoCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "info",
      name: "weather",
      description: "Get information about a country",
      options: [
        {
          name: "query",
          description: "Can be a country, city, state",
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const query = interaction.options.getString("query", true);

    const url = `${this.APIs.Weather}${encodeURIComponent(query)}&appid=${
      process.env["OPEN_WEATHER_MAP_API_KEY"]
    }&units=metric`;
    const data = (await request(url).then((res) => res.body.json())) as WeatherData;

    if (data.cod === 401) {
      return interaction.editReply({ content: lang.GLOBAL.ERROR });
    }

    if (data.cod === "404") {
      return interaction.editReply({
        content: this.bot.utils.translate(lang.UTIL.C_NOT_FOUND, { query }),
      });
    }

    const main = data.weather[0].main.toString();
    const desc = data.weather[0].description.toString();
    const icon = data.weather[0].icon.toString();
    const feelsLike = data.main.feels_like.toString();
    const temp = data.main.temp.toString();
    const windSpeed = data.wind.speed.toString();
    const windDeg = this.getWindDirection(data.wind.deg, lang);

    const country = data.sys.country.toString();
    const flag = `https://flagcdn.com/w40/${country.toLowerCase()}.png`;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setAuthor({ name: `${data.name} (${country}) ${lang.UTIL.WEATHER}`, iconURL: flag })
      .setThumbnail(`https://openweathermap.org/img/wn/${icon}@2x.png`)
      .setDescription(
        `
  ${bold(lang.UTIL.MAIN)}: ${main}
  ${bold(lang.UTIL.CURRENT)}: ${desc}
  ${bold(lang.UTIL.WIND_SPEED)}: ${windSpeed}km/h
  ${bold(lang.UTIL.WIND_DEGREES)}: ${windDeg}
  `,
      )
      .addFields({
        name: lang.UTIL.TEMPERATURE,
        value: `
  ${bold(lang.UTIL.CURRENT_TEMP)}: ${temp}°C
  ${bold(lang.UTIL.FEELS_LIKE)}: ${feelsLike}°C
  `,
      });

    await interaction.editReply({ embeds: [embed] });
  }

  getWindDirection(v: number, lang: typeof import("@locales/english").default) {
    if (v === 0) {
      return lang.OTHER.WIND_DIRECTIONS.NORTH;
    } else if (v > 0 && v < 90) {
      return lang.OTHER.WIND_DIRECTIONS.NORTH_EAST;
    } else if (v === 90) {
      return lang.OTHER.WIND_DIRECTIONS.EAST;
    } else if (v > 90 && v < 180) {
      return lang.OTHER.WIND_DIRECTIONS.SOUTH_EAST;
    } else if (v === 180) {
      return lang.OTHER.WIND_DIRECTIONS.SOUTH;
    } else if (v > 180 && v < 270) {
      return lang.OTHER.WIND_DIRECTIONS.SOUTH_WEST;
    } else if (v === 270) {
      return lang.OTHER.WIND_DIRECTIONS.WEST;
    } else if (v > 270 && v < 360) {
      return lang.OTHER.WIND_DIRECTIONS.NORTH_WEST;
    }

    return lang.UTIL.UNKNOWN;
  }
}

interface WeatherData {
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
