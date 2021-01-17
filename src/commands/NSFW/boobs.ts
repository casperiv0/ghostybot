import { Message } from "discord.js";
import fetch from "node-fetch";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BoobsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "boobs",
      description: "None",
      category: "nsfw",
      nsfwOnly: true,
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const data = await fetch("http://api.oboobs.ru/boobs/0/1/random").then((res) => res.json());
  
      const boobs = bot.utils
        .baseEmbed(message)
        .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(http://media.oboobs.ru/${data[0].preview})`)
        .setImage(`http://media.oboobs.ru/${data[0].preview}`);
  
      message.channel.send(boobs);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
