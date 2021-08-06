import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function buy(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const rawItem = interaction.options.getString("item", true);

  const guild = await bot.utils.getGuildById(interaction.guildId!);
  const user = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
  const inventory = user?.inventory;
  const prefix = guild?.prefix;

  if (!guild?.store) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ECONOMY.STORE_EMPTY,
    });
  }

  if (!user) {
    return interaction.reply({ content: lang.GLOBAL.ERROR });
  }

  const item = guild?.store?.filter(
    (storeItem) => storeItem.name.toLowerCase() === rawItem.toLowerCase(),
  )[0];

  if (!item) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ECONOMY.NOT_FOUND_STORE.replace("{query}", rawItem).replace(
        "{prefix}",
        `${prefix}`,
      ),
    });
  }

  if (inventory && inventory?.includes(item.name)) {
    return interaction.reply({
      content: lang.ECONOMY.ALREADY_OWN_ITEM,
      ephemeral: true,
    });
  }

  if (!user?.money !== null && user?.money < item.price) {
    return interaction.reply({
      content: lang.ECONOMY.NOT_ENOUGH_MONEY,
      ephemeral: true,
    });
  }

  if (!inventory) {
    bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      inventory: [item.name],
      money: user.money - item.price,
    });
  } else {
    bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      inventory: [...inventory, item.name],
      money: user.money - item.price,
    });
  }

  interaction.reply({
    content: lang.ECONOMY.BUY_SUCCESS.replace("{item}", item.name).replace(
      "{price}",
      `${item.price}`,
    ),
  });
}
