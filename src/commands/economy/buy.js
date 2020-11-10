const {
  getGuildById,
  getUserById,
  updateUserById,
} = require("../../utils/functions");

module.exports = {
  name: "buy",
  description: "Buy an item from the store",
  category: "economy",
  usage: "buy <item name>",
  cooldown: 10,
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guildId = message.guild.id;
    const guild = await getGuildById(guildId);
    const { user } = await getUserById(message.author.id, message.guild.id);
    const inventory = user?.inventory;
    const prefix = guild.prefix;
    let query = args[0];

    if (!guild?.store) {
      return message.channel.send(lang.ECONOMY.STORE_EMPTY);
    }

    if (!query) {
      return message.channel.send(lang.ECONOMY.PROVIDE_ITEM_TO_BUY);
    }

    query = query.toLowerCase();

    const item = guild?.store?.filter(
      (storeItem) => storeItem.name === query
    )[0];

    if (!item)
      return message.channel.send(
        lang.ECONOMY.NOT_FOUND_STORE.replace("{query}", query).replace(
          "{prefix}",
          prefix
        )
      );

    if (inventory && inventory?.includes(item.name)) {
      return message.channel.send(lang.ECONOMY.ALREADY_OWN_ITEM);
    }

    if (!user?.money !== null && user?.money < item.price)
      return message.channel.send(lang.ECONOMY.NOT_ENOUGH_MONEY);

    if (!inventory) {
      updateUserById(message.author.id, guildId, {
        inventory: [item.name],
        money: user.money - item.price,
      });
    } else {
      updateUserById(message.author.id, guildId, {
        inventory: [...inventory, item.name],
        money: user.money - item.price,
      });
    }

    message.channel.send(
      lang.ECONOMY.BUY_SUCCESS.replace("{item}", item.name).replace(
        "{price}",
        item.price
      )
    );
  },
};
