import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class HugCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "hug",
      description: "Shows a picture of people hugging",
      category: "image",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://nekos.life/api/hug").then((res) => res.json());
      const user = message.mentions.users.first() || message.author;
      const hugged = message.author.id === user.id ? "themselfs" : user.username;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${message.author.username} ${lang.IMAGE.HUGGED} ${hugged}`)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(`${data.url}`);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
