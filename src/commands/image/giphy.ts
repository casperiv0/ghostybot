import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class GiphyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "giphy",
      description: "Return a giphy image",
      category: "image",
      requiredArgs: [{ name: "text" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      if (!bot.config.giphyApiKey) {
        message.channel.send(lang.IMAGE.NO_GIPHY_KEY);
      }

      const api_key = bot.config.giphyApiKey;
      const q = encodeURIComponent(args.join(" "));
      const limit = 1;
      const rating = "pg-13";
      const randomInt = Math.floor(Math.random() * 100);
      const url = `https://api.giphy.com/v1/gifs/search?api_key=${api_key}&q=${q}&lang=en&rating=${rating}&limit=${limit}&offset=${randomInt}`;
      const res = await (await fetch(url)).json();
      const data = res.data[0];

      if (!data) {
        return message.channel.send(lang.IMAGE.NO_GPIHY_FOUND);
      }

      const image = data.images.original.url;

      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(data.title)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(`${image}`);

      return message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
