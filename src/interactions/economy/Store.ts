import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class StoreCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "store",
      description: "See items in the store",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const guild = await this.bot.utils.getGuildById(interaction.guildId!);

    if (!guild?.store || !guild.store.length) {
      return interaction.reply({
        content: lang.ECONOMY.STORE_EMPTY,
      });
    }

    const items = guild.store
      .map(
        (item) => `**${lang.GLOBAL.NAME}:** ${item.name}, **${lang.ECONOMY.PRICE}:** ${item.price}`,
      )
      .join(",\n ");

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${interaction.guild?.name} ${lang.ECONOMY.STORE}`)
      .setDescription(`${items}`);

    await interaction.reply({ embeds: [embed] });
  }
}
