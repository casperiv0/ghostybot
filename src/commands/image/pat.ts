import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class PatCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "pat",
      description: "Pat somebody",
      category: "image",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await fetch("https://nekos.life/api/v2/img/pat").then((res) => res.json());
      const user = message.mentions.users.first() || message.author;
      const patted = message.author.id === user.id ? "themselfs" : user.username;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${message.author.username} ${lang.IMAGE.PATTED} ${patted}`)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(`${data.url}`);
  
      message.channel.send({ embed });
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
