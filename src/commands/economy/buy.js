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
    const guildId = message.guild.id;
    const guild = await getGuildById(guildId);
    const { user } = await getUserById(message.author.id, message.guild.id);
    const inventory = user?.inventory;
    const prefix = guild?.prefix || "!";
    let query = args[0];

    if (!guild?.store) {
      return message.channel.send(
        `The store for this server is empty! Ask a moderator to add items to the store using \`${prefix}store add <item>\` `
      );
    }

    if (!query) {
      return message.channel.send("Please provide an item to buy!");
    }

    query = query.toLowerCase();

    const item = guild?.store?.filter(
      (storeItem) => storeItem.name === query
    )[0];

    if (!item)
      return message.channel.send(
        `**${query}** wasn't found in the store, please use \`${prefix}store\` to see all items in the store`
      );

    if (inventory && inventory?.includes(item.name)) {
      return message.channel.send("You already own this item!");
    }

    if (!user?.money !== null && user?.money < item.price)
      return message.channel.send(
        "You don't have enough money to buy this item!"
      );

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
      `Successfully bought **${item.name}** paid **${item.price}**`
    );
  },
};
