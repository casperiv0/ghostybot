import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class NpmCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "npm",
      description: "Search packages on npm by their name",
      category: "util",
      requiredArgs: [{ name: "query" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const query = args.join(" ");

      const data = await fetch(
        `http://registry.npmjs.com/-/v1/search?text=${query}&size=5`
      ).then((res) => res.json());

      const foundPackages = data.objects.map(({ package: pkg, searchScore }) => {
        return { ...pkg, searchScore };
      });

      if (foundPackages.length <= 0) {
        return message.channel.send(lang.UTIL.NPM_NOT_FOUND.replace("{query}", query));
      }

      // Most accurate package
      const foundPackage = foundPackages.find((d) => d.searchScore > 10000);

      // if it was found, show more info about the package, otherwise return a list of the top 5
      if (foundPackage) {
        const { tz, date } = await bot.utils.formatDate(foundPackage.date, message.guild?.id);
        const maintainers = foundPackage.maintainers.map(({ username }) => username).join(", ");

        const embed = bot.utils
          .baseEmbed(message)
          .setURL(foundPackage.links.npm)
          .setTitle(foundPackage.name)
          .setDescription(foundPackage?.description ?? lang.GLOBAL.NONE)
          .addField(lang.UTIL.VERSION, foundPackage.version, true)
          .addField(lang.UTIL.LAST_MODIFIED, `${date} (${tz})`, true)
          .addField(lang.UTIL.MAINTAINERS, maintainers);

        return message.channel.send(embed);
      }

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.UTIL.NPM_SEARCH)
        .setDescription(lang.UTIL.NPM_TOP_5.replace("{query}", query));

      foundPackages.forEach((pkg) => {
        embed.addField(
          pkg.name,
          `
          **${lang.UTIL.VERSION}:** ${pkg.version}
          **${lang.UTIL.AUTHOR}:** ${pkg?.publisher.username}
          [**${lang.UTIL.VIEW_ON_NPM}**](${pkg.links.npm})
          `
        );
      });

      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
