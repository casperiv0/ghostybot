import { Message } from "discord.js";
import PlayStore, { IAppItem } from "google-play-scraper";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PlaystoreCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "playstore",
      aliases: ["ps"],
      description: "Show Playstore Application Information Of Your Given Name!",
      usage: "<Application Name>",
      category: "util",
      requiredArgs: [{ name: "app" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const search = args.join(" ");

      if (!search) {
        return message.channel.send(lang.GLOBAL.PROVIDE_ARGS);
      }

      PlayStore.search({
        term: args.join(" "),
        num: 1,
      }).then((Data) => {
        let app: IAppItem;

        try {
          app = JSON.parse(JSON.stringify(Data[0]));
        } catch (error) {
          return message.channel.send(lang.UTIL.PS_NOT_FOUND);
        }

        const Embed = bot.utils
          .baseEmbed(message)
          .setThumbnail(app.icon)
          .setURL(app.url)
          .setTitle(`${app.title}`)
          .setDescription(app.summary)
          .addField(lang.ECONOMY.PRICE, app.priceText, true)
          .addField(lang.UTIL.DEVELOPER, app.developer, true)
          .addField(lang.UTIL.SCORE, app.scoreText, true);

        return message.channel.send(Embed);
      });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
