import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class FlipCoinCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "flipcoin",
      description: "Flip a coin",
      category: "games",
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const replies = [`**${lang.GAMES.LANDED_HEADS}**`, `**${lang.GAMES.LANDED_TAILS}**`];

      const reply = replies[Math.floor(Math.random() * replies.length)];

      const embed = bot.utils.baseEmbed(message).setTitle("FlipCoin").setDescription(`${reply}`);

      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
