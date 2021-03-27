import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class MdnCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "mdn",
      description: "Returns the request query from mozilla developer network",
      category: "util",
      requiredArgs: [{ name: "query" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const query = encodeURIComponent(args.join(" "));

      const url = `https://www.google.com/search?q=site%3Adeveloper.mozilla.org+`;
      const res = await fetch(`${url}${encodedQuery}`);
      const text = await res.text();

      const $ = cheerio.load(text);
      const firstResult = $('.r a');
      const responseUrl = firstResult.attr('href');

      if (!responseUrl) {
        return message.channel.send(lang.UTIL.DOC_NOT_FOUND);
      }

      const queryStringStart = responseUrl.indexOf('&');
      const formattedUrl = responseUrl.slice(7, queryStringStart);

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle("Here what i found for you")
        .setURL(formattedUrl);

      return message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
