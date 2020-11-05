/* eslint-disable no-case-declarations */
const { MessageEmbed } = require("discord.js");
const { updateGuildById, getGuildById } = require("../../utils/functions");
const { ownerId } = require("../../../config.json");

module.exports = {
  name: "store",
  description: "View the store/shop to buy something",
  category: "economy",
  options: ["no-options", "add", "remove"],
  aliases: ["shop"],
  usage: "store <option | no-args>",
  async execute(_bot, message, args) {
    const guildId = message.guild.id;
    const guild = await getGuildById(guildId);
    const option = args[0];
    const prefix = guild?.prefix || "!";
    let item = args.slice(1)[0]; // Take first argument after option (item)
    const price = args.slice(1)[1]; // take second argument after option (price)

    if (option) {
      if (ownerId === message.author.id) {
        updateStore(message, item, price, option, guild, guildId);
      } else if (message.member.hasPermission("MANAGE_GUILD")) {
        updateStore(message, item, price, option, guild, guildId);
      } else {
        return message.channel.send(
          `You don't have the correct permissions to **${option}** an item! (Manage Server)`
        );
      }
    } else {
      if (!guild?.store) {
        return message.channel.send(
          `The store for this server is empty! Ask a moderator to add items to the store using \`${prefix}store add <item>\` `
        );
      }

      const items = guild.store
        ?.map((item) => `**Name:** ${item.name}, **Price:** ${item.price}`)
        ?.join(",\n ");

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

async function updateStore(message, item, price, option, guild, guildId) {
  if (!item) {
    return message.channel.send("Please provide a valid item to add/remove!");
  }

  item = item.toLowerCase();

  switch (option.toLowerCase()) {
    case "add": {
      const exists = guild.store.filter((i) => i.name === item)[0];

      if (exists) {
        return message.channel.send(`**${item}** already exist in the store!`);
      }

      if (!price) {
        return message.channel.send("Please provide a price for the item!");
      }

      if (isNaN(price)) return message.channel.send("Price must be a number!");

      if (!guild?.store) {
        await updateGuildById(guildId, {
          store: [{ name: item, price }],
        });
      } else {
        await updateGuildById(guildId, {
          store: [...guild?.store, { name: item, price }],
        });
      }

      message.channel.send(`**${item}** was added to the store!`);
      break;
    }

    case "remove": {
      const existing = guild?.store?.filter((i) => i.name === item)[0];

      if (!existing) {
        return message.channel.send(`**${item}** doesn't exist in the store!`);
      }

      const updatedItems = guild?.store.filter(
        (storeItem) => storeItem.name !== item
      );

      updateGuildById(guildId, { store: updatedItems });

      message.channel.send(`${item} was removed from the store!`);
      break;
    }

    default:
      message.channel.send(`${option} Is not a valid option`);
  }
}
