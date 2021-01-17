import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class ButtCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "butt",
      description: "None",
      category: "nsfw",
      nsfwOnly: true,
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await fetch("http://api.obutts.ru/butts/0/1/random").then((res) => res.json());
  
      const butt = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(http://media.obutts.ru/${data[0].preview})`)
        .setImage(`http://media.obutts.ru/${data[0].preview}`);
  
      message.channel.send(butt);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
