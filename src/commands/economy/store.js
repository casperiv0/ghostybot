/* eslint-disable no-case-declarations */
const { MessageEmbed } = require("discord.js");
const { ownerId } = require("../../../config.json");
const {
  getStoreItems,
  setStoreItems,
  removeStoreItem,
  getServerPrefix,
} = require("../../utils/functions");

module.exports = {
  name: "store",
  description: "View the store/shop to buy something",
  category: "economy",
  options: ["no-options", "add", "remove"],
  aliases: ["shop"],
  usage: "store <option | no-args>",
  async execute(bot, message, args) {
    const guildId = message.guild.id;
    const storeItems = await getStoreItems(guildId);
    const prefix = await getServerPrefix(guildId);
    const option = args[0];
    let item = args.slice(1)[0]; // Take first argument after option (item)
    const price = args.slice(1)[1]; // take second argument after option (price)
    
    if (option) {
      if (ownerId === message.author.id) {
        updateStore(message, item, price, option, storeItems, guildId);
      } else if (message.member.hasPermission("MANAGE_GUILD")) {
        updateStore(message, item, price, option, storeItems, guildId);
      } else {
        return message.channel.send(
          `You don't have the correct permissions to **${option}** an item! (Manage Server)`
        );
      }
    } else {
      if (storeItems === null || !storeItems[0])
        return message.channel.send(
          `The store for this server is empty! Ask a moderator to add items to the store using \`${prefix}store add <item>\` `
        );

      const items = storeItems
        .map((item) => `**Name:** ${item.name}, **Price:** ${item.price}`)
        .join(",\n ");

      const embed = new MessageEmbed()
        .setTitle(`${message.guild.name}'s Store`)
        .setDescription(`${items}`)
        .setColor("BLUE")
        .setFooter(message.author.username)
        .setTimestamp();

      message.channel.send({ embed });
    }
  },
};

function updateStore(message, item, price, option, storeItems, guildId) {
  if (!item)
    return message.channel.send("Please provide a valid item to add/remove!");

  item = item.toLowerCase();

  switch (option.toLowerCase()) {
    case "add":
      const exists = storeItems?.filter((i) => i.name === item)[0];
      if (exists)
        return message.channel.send(`**${item}** already exist in the store!`);

      if (!price)
        return message.channel.send("Please provide a price for the item!");

      if (isNaN(price)) return message.channel.send("Price must be a number!");

      setStoreItems(guildId, { name: item, price: price });
      message.channel.send(`**${item}** was added to the store!`);
      break;

    case "remove":
      const existing = storeItems?.filter((i) => i.name === item)[0];
      if (!existing)
        return message.channel.send(`**${item}** doesn't exist in the store!`);

      const updatedItems = storeItems.filter(
        (storeItem) => storeItem.name !== item
      );
      removeStoreItem(guildId, updatedItems);
      message.channel.send(`${item} was removed from the store!`);
      break;

    default:
      message.channel.send(`${option} Is not a valid option`);
  }
}
