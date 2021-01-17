import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class HappinessCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "happiness",
      description: "Get a happiness returned",
      category: "games",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const happiness = Math.floor(Math.random() * 100) + 1;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(lang.GAMES.HAPPINESS)
        .setDescription(`${happiness}%`);
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
