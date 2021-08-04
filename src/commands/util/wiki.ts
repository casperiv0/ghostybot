import { Message } from "discord.js";
import wiki from "wikijs";
import Command from "structures/Command";
import Bot from "structures/Bot";

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

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const search = await wiki().search(args.join(" "));

      if (!search.results[0]) {
        return message.channel.send({ content: lang.UTIL.NO_W_FOUND });
      }

      const result = await wiki().page(search.results[0]);
      const description = await result.summary();

      const title = result.raw.title;
      const url = result.raw.fullurl;

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(`${title} (${lang.UTIL.READ_MORE})`)
        .setURL(url)
        .setDescription(`${description.slice(0, 2045)}${description.length > 2048 ? "..." : ""}`);

      message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
