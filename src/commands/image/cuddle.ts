import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class CuddleCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "cuddle",
      description: "Cuddle with somebody",
      category: "image",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await bot.neko.sfw.cuddle();
  
      const user = message.mentions.users.first() || message.author;
      const cuddled = message.author.id === user.id ? "themselfs" : user.username;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`${message.author.username} ${lang.IMAGE.CUDDLES} ${cuddled}`)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
        .setImage(`${data.url}`);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
