import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class RobCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "rob",
      cooldown: 0,
      description: "Rob up to 1000coins from somebody",
      category: "economy",
      requiredArgs: [{ name: "member" }, { name: "amount", type: "number" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await bot.utils.findMember(message, args);
      const amount = Number(args[1]);

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      if (member.user.bot) {
        return message.channel.send(lang.MEMBER.BOT_DATA);
      }

      if (member.user.id === message.author.id) {
        return message.channel.send(lang.ECONOMY.CANNOT_ROB_SELF);
      }

      if (amount > 1000) {
        return message.channel.send(lang.ECONOMY.BETWEEN_1_1000);
      }

      if (amount < 0) {
        return message.channel.send(lang.ECONOMY.BETWEEN_1_1000);
      }

      const userId = member.user.id;
      const user = await bot.utils.getUserById(userId, message.guild?.id);
      const robber = await bot.utils.getUserById(message.author.id, message.guild?.id);

      if (!user || !robber) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }

      if (user.money <= 0) {
        return message.channel.send(lang.ECONOMY.MEMBER_NO_MONEY);
      }

      await bot.utils.updateUserById(userId, message.guild?.id, {
        money: user.money - amount,
      });
      await bot.utils.updateUserById(message.author.id, message.guild?.id, {
        money: robber.money + Number(amount),
      });

      return message.channel.send(
        lang.ECONOMY.ROB_SUCCESS.replace("{amount}", `${amount}`).replace(
          "{member}",
          member.user.tag
        )
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
