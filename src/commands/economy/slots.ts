import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

const items = ["🍒", "🍓", "🍉", "🍌", "🍪", "🍏", "🍎"];

export default class SlotsCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "slots",
      description: "Slots machine",
      category: "economy",
      // cooldown: 20,
      usage: "<amount>",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const user = await bot.utils.getUserById(message.author.id, message.guild?.id);
      const numbers: number[] = [];
      let amount = Number(args[0]);
      let hasWon = false;
  
      if (!user) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }
  
      if (amount < 0) {
        return message.channel.send(lang.ECONOMY.MIN_BET);
      }
  
      if (amount > 500) {
        return message.channel.send(lang.ECONOMY.MAX_BET);
      }
  
      if (amount > user.money) {
        return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);
      }
  
      if (amount && isNaN(amount)) {
        return message.channel.send(lang.LEVELS.PROVIDE_VALID_NR);
      }
  
      for (let i = 0; i < 3; i++) {
        const random = Math.floor(Math.random() * items.length);
        numbers[i] = random;
      }
  
      const isAll = numbers[0] === numbers[1] && numbers[1] === numbers[2];
      const isOne =
        numbers[0] === numbers[1] || numbers[1] === numbers[2] || numbers[0] === numbers[2];
  
      if (isAll) {
        amount = amount ? (amount *= 5) : 300;
        hasWon = true;
      } else if (isOne) {
        amount = amount ? (amount *= 3) : 150;
        hasWon = true;
      }
  
      const embed = bot.utils
        .baseEmbed(message)
        .setDescription(`${items[numbers[0]]} ${items[numbers[1]]} ${items[numbers[2]]}`);
  
      if (hasWon) {
        embed.setTitle(lang.ECONOMY.WON_SLOTS.replace("{amount}", `${amount}`));
        await bot.utils.updateUserById(message.author.id, message.guild?.id, {
          money: user.money + amount,
        });
      } else {
        const removalCount = amount ? amount : 0;
        embed.setTitle(lang.ECONOMY.LOST_SLOTS);
        await bot.utils.updateUserById(message.author.id, message.guild?.id, {
          money: user.money - removalCount,
        });
      }
  
      message.channel.send(embed);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
