import { Message } from "discord.js";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class StoreCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "store",
      description: "View the store/shop to buy something",
      category: "economy",
      options: ["no-options", "add", "remove"],
      aliases: ["shop"],
      usage: "<option | no-args>",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);

    try {
      const guildId = message.guild?.id;
      const guild = await bot.utils.getGuildById(guildId);
      const prefix = guild?.prefix;
      const [option, item, price] = args;

      if (option) {
        if (!message.member?.hasPermission("MANAGE_GUILD")) {
          return message.channel.send("You need: `MANAGE_GUILD` permissions");
        }

        if (!item) {
          return message.channel.send(lang.ECONOMY.PROVIDE_VALID_ITEM);
        }

        switch (option.toLowerCase()) {
          case "add": {
            const exists = guild?.store.filter((i) => i.name === item)[0];

            if (exists) {
              return message.channel.send(lang.ECONOMY.ALREADY_EXISTS.replace("{item}", item));
            }

            if (!price) {
              return message.channel.send(lang.ECONOMY.PROVIDE_PRICE);
            }

            if (isNaN(Number(price))) {
              return message.channel.send(lang.ECONOMY.MUST_BE_NUMBER);
            }

            if (!guild?.store) {
              await bot.utils.updateGuildById(guildId, {
                store: [{ name: item, price: Number(price) }],
              });
            } else {
              await bot.utils.updateGuildById(guildId, {
                store: [...guild?.store, { name: item, price: Number(price) }],
              });
            }

            message.channel.send(lang.ECONOMY.ADDED_TO_STORE.replace("{item}", item));
            break;
          }

          case "remove": {
            const existing = guild?.store?.filter((i) => i.name === item)[0];

            if (!existing) {
              return message.channel.send(lang.ECONOMY.NOT_IN_STORE.replace("{item}", item));
            }

            const updatedItems = guild?.store.filter((storeItem) => storeItem.name !== item);

            bot.utils.updateGuildById(guildId, { store: updatedItems });

            message.channel.send(lang.ECONOMY.REMOVED_FROM_STORE.replace("{item}", item));
            break;
          }

          default:
            message.channel.send(lang.GLOBAL.NOT_AN_OPTION.replace("{option}", option));
        }
      } else {
        if (!guild?.store) {
          return message.channel.send(lang.ECONOMY.STORE_EMPTY.replace("{prefix}", `${prefix}`));
        }

        const items = guild.store
          ?.map(
            (item) =>
              `**${lang.GLOBAL.NAME}:** ${item.name}, **${lang.ECONOMY.PRICE}:** ${item.price}`
          )
          ?.join(",\n ");

        const embed = bot.utils
          .baseEmbed(message)
          .setTitle(`${message.guild?.name} ${lang.ECONOMY.STORE}`)
          .setDescription(`${items}`);

        message.channel.send({ embed });
      }
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
