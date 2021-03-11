import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class NasaNews extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "nasanews",
      description: "Looks up an astronomy-related term on NASA's Website",
      category: "util",
      requiredArgs: [{ name: "query" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const query = args.join(" ");
    const data = await fetch(
      `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`
    ).then((res) => res.json());

    const item = data.collection.items[0];

    if (!item) {
      return message.channel.send(lang.NASANEWS.NOT_FOUND.replace("{query}", query));
    }

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle(data.collection.items[0].data[0].title)
      .setURL(encodeURI(item.href))
      .setDescription(`${data.collection.items[0].data[0].description.substr(0, 2044)}...`);

    message.channel.send({ embed });
  }
}
