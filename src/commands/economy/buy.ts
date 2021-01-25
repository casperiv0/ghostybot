import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class BuyCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "buy",
      description: "Buy an item from the store",
      category: "economy",
      usage: "<item name>",
      cooldown: 10,
      requiredArgs: [{ name: "item name" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const guildId = message.guild?.id;
      const guild = await bot.utils.getGuildById(guildId);
      const user = await bot.utils.getUserById(message.author.id, message.guild?.id);
      const inventory = user?.inventory;
      const prefix = guild?.prefix;
      let query = args[0];

      if (!guild?.store) {
        return message.channel.send(lang.ECONOMY.STORE_EMPTY);
      }

      if (!query) {
        return message.channel.send(lang.ECONOMY.PROVIDE_ITEM_TO_BUY);
      }

      if (!user) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }

      query = query.toLowerCase();

      const item = guild?.store?.filter((storeItem) => storeItem.name === query)[0];

      if (!item)
        return message.channel.send(
          lang.ECONOMY.NOT_FOUND_STORE.replace("{query}", query).replace("{prefix}", `${prefix}`)
        );

      if (inventory && inventory?.includes(item.name)) {
        return message.channel.send(lang.ECONOMY.ALREADY_OWN_ITEM);
      }

      if (!user?.money !== null && user?.money < item.price)
        return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);

      if (!inventory) {
        bot.utils.updateUserById(message.author.id, guildId, {
          inventory: [item.name],
          money: user.money - item.price,
        });
      } else {
        bot.utils.updateUserById(message.author.id, guildId, {
          inventory: [...inventory, item.name],
          money: user.money - item.price,
        });
      }

      message.channel.send(
        lang.ECONOMY.BUY_SUCCESS.replace("{item}", item.name).replace("{price}", `${item.price}`)
      );
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
