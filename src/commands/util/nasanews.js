import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class NasanewsCommand extends Command {
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

    if (!data.collection.items[0].data[0].description)
    return message.channel.send(lang.NASANEWS.NOT_FOUND.replace("{query}", query));

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle(data.collection.items[0].data[0].title)
      .setDescription(`${data.collection.items[0].data[0].description.substr(0, 2043)}.....`)
      .setImage(data.collection.items[0].links[0].href.split(' ').join('%20'));

    message.channel.send({ embed });
  }
}
