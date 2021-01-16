import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RemindersCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "meme",
      description: "Returns a meme",
      category: "games",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    const data = await fetch("https://meme-api.herokuapp.com/gimme").then((res) => res.json());

    const embed = bot.utils
      .baseEmbed(message)
      .setTitle(data.title)
      .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
      .setImage(data.url);

    message.channel.send(embed);
  }
}
