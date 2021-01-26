import { Message } from "discord.js";
import wiki from "wikijs";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class WikiCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "wiki",
      aliases: ["wikipediasearch", "wikipedia"],
      category: "util",
      description: "Search something up on Wikipedia",
      requiredArgs: [{ name: "query" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const search = await wiki().search(args.join(" "));

      if (!search.results[0]) {
        return message.channel.send(lang.UTIL.NO_W_FOUND);
      }

      const result = await wiki().page(search.results[0]);
      const description = await result.summary();

      const title = (result as any).raw.title;
      const url = (result as any).raw.fullurl;

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${title} (read more)`)
        .setURL(url)
        .setDescription(`${description.slice(0, 2045)}${description.length > 2048 ? "..." : ""}`);

      message.channel.send("", embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
