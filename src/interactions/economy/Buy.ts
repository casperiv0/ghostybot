import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class BuyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "buy",
      description: "Buy something from the store",
      options: [
        {
          description: "The store item",
          name: "item",
          required: true,
          type: DJS.ApplicationCommandOptionType.String,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const rawItem = interaction.options.getString("item", true);

    const guild = await this.bot.utils.getGuildById(interaction.guildId!);
    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    const inventory = user?.inventory;

    if (!guild?.store) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ECONOMY.STORE_EMPTY,
      });
    }

    if (!user) {
      return interaction.reply({ content: lang.GLOBAL.ERROR });
    }

    const [item] = guild.store.filter(
      (storeItem) => storeItem.name.toLowerCase() === rawItem.toLowerCase(),
    );

    if (!item) {
      return interaction.reply({
        ephemeral: true,
        content: this.bot.utils.translate(lang.ECONOMY.NOT_FOUND_STORE, { query: rawItem }),
      });
    }

    if (inventory?.includes(item.name)) {
      return interaction.reply({
        content: lang.ECONOMY.ALREADY_OWN_ITEM,
        ephemeral: true,
      });
    }

    if (!user.money !== null && user.money < +item.price) {
      return interaction.reply({
        content: lang.ECONOMY.NOT_ENOUGH_MONEY,
        ephemeral: true,
      });
    }

    if (!inventory) {
      this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        inventory: [item.name],
        money: user.money - +item.price,
      });
    } else {
      this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        inventory: [...inventory, item.name],
        money: user.money - +item.price,
      });
    }

    interaction.reply({
      content: this.bot.utils.translate(lang.ECONOMY.BUY_SUCCESS, {
        item: item.name,
        price: +item.price,
      }),
    });
  }
}
