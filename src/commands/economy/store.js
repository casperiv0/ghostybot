/* eslint-disable no-case-declarations */
const { updateGuildById, getGuildById } = require("../../utils/functions");
const { ownerId } = require("../../../config.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "store",
  description: "View the store/shop to buy something",
  category: "economy",
  options: ["no-options", "add", "remove"],
  aliases: ["shop"],
  usage: "store <option | no-args>",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const guildId = message.guild.id;
    const guild = await getGuildById(guildId);
    const option = args[0];
    const prefix = guild.prefix;
    let item = args.slice(1)[0]; // Take first argument after option (item)
    const price = args.slice(1)[1]; // take second argument after option (price)

    if (option) {
      if (ownerId === message.author.id) {
        updateStore(message, item, price, option, guild, guildId, lang);
      } else if (message.member.hasPermission("MANAGE_GUILD")) {
        updateStore(message, item, price, option, guild, guildId, lang);
      } else {
        return message.channel.send(lang.ECONOMY.MANAGE_STORE_PERMS);
      }
    } else {
      if (!guild?.store) {
        return message.channel.send(
          `The store for this server is empty! Ask a moderator to add items to the store using \`${prefix}store add <item>\` `
        );
      }

      const items = guild.store
        ?.map(
          (item) =>
            `**${lang.GLOBAL.NAME}:** ${item.name}, **${lang.ECONOMY.PRICE}:** ${item.price}`
        )
        ?.join(",\n ");

      const embed = BaseEmbed(message)
        .setTitle(`${message.guild.name} ${lang.ECONOMY.STORE}`)
        .setDescription(`${items}`);

      message.channel.send({ embed });
    }
  },
};

async function updateStore(message, item, price, option, guild, guildId, lang) {
  if (!item) {
    return message.channel.send(lang.ECONOMY.PROVIDE_VALID_ITEM);
  }

  item = item.toLowerCase();

  switch (option.toLowerCase()) {
    case "add": {
      const exists = guild.store.filter((i) => i.name === item)[0];

      if (exists) {
        return message.channel.send(
          lang.ECONOMY.ALREADY_EXISTS.replace("{item}", item)
        );
      }

      if (!price) {
        return message.channel.send(lang.ECONOMY.PROVIDE_PRICE);
      }

      if (isNaN(price)) {
        return message.channel.send(lang.ECONOMY.MUST_BE_NUMBER);
      }

      if (!guild?.store) {
        await updateGuildById(guildId, {
          store: [{ name: item, price }],
        });
      } else {
        await updateGuildById(guildId, {
          store: [...guild?.store, { name: item, price }],
        });
      }

      message.channel.send(
        lang.ECONOMY.ADDED_TO_STORE.replace("{item}", item)
      );
      break;
    }

    case "remove": {
      const existing = guild?.store?.filter((i) => i.name === item)[0];

      if (!existing) {
        return message.channel.send(
          lang.ECONOMY.NOT_IN_STORE.replace("{item}", item)
        );
      }

      const updatedItems = guild?.store.filter(
        (storeItem) => storeItem.name !== item
      );

      updateGuildById(guildId, { store: updatedItems });

      message.channel.send(
        lang.ECONOMY.REMOVED_FROM_STORE.replace("{item}", item)
      );
      break;
    }

    default:
      message.channel.send(
        lang.GLOBAL.NOT_AN_OPTION.replace("{option}", option)
      );
  }
}
