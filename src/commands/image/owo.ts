import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class OwoCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "owo",
      description: "OwO",
      category: "image",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const data = await fetch("https://rra.ram.moe/i/r?type=owo").then((res) => res.json());
  
      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(
          `${lang.IMAGE.CLICK_TO_VIEW}(https://cdn.ram.moe/${data.path.replace("/i/", "")})`
        )
        .setImage(`https://cdn.ram.moe/${data.path.replace("/i/", "")}`);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
