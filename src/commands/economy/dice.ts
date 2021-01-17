import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class DiceCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "dice",
      description: "Roll a dice",
      category: "economy",
      cooldown: 5,
    });
  }

  async execute(bot: Bot, message: Message) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const user = await bot.utils.getUserById(message.author.id, message.guild?.id);
  
      if (!user) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
  
      const roll = Math.floor(Math.random() * 6) + 1;
      const price = 200;
  
      const embed = bot.utils
        .baseEmbed(message)
        .setTitle(`🎲 ${lang.ECONOMY.DICE_LANDED.replace("{roll}", `${roll}`)}`);
  
      if (roll === 6) {
        embed.setDescription(`🎉 ${lang.ECONOMY.DICE_WON.replace("{price}", `${price}`)}`);
        bot.utils.updateUserById(message.author.id, message.guild?.id, {
          money: user.money + price,
        });
      } else {
        embed.setDescription(`❌ ${lang.ECONOMY.DICE_LOST.replace("{price}", `${price}`)}`);
      }
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
