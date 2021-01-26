import { Message } from "discord.js";
import cheerio from "cheerio";
import request from "request";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ImageCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "randomimage",
      aliases: ["imagesearch"],
      description: "Search any image you want from google",
      category: "util",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const text = args.join(" ");

      const options = {
        url: "http://results.dogpile.com/serp?qc=images&q=" + text,
        method: "GET",
        headers: {
          Accept: "text/html",
          "User-Agent": "Chrome",
        },
      };

      request(options, function (error, _response, responseBody) {
        if (error) {
          return;
        }

        const $ = cheerio.load(responseBody);

        const links = $(".image a.link");
        const urls: string[] = [];

        links.map((i) => {
          urls.push(`${links.eq(i).attr("href")}`);
        });

        if (!urls.length) {
          return message.channel.send(lang.UTIL.NO_IMG_FOUND);
        }

        const randomIndex = Math.floor(Math.random() * urls.length);
        const image = urls[randomIndex];
        const embed = bot.utils.baseEmbed(message).setImage(image);
        message.channel.send(embed);
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
