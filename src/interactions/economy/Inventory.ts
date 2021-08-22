import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class InventoryCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "inventory",
      description: "See the inventory of a user",
      options: [
        {
          type: "USER",
          required: false,
          name: "user",
          description: "The user you want to see their inventory of",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const user = interaction.options.getUser("user") ?? interaction.user;
    if (user.bot) {
      return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
    }

    const dbUser = await this.bot.utils.getUserById(user.id, interaction.guildId!);
    if (!dbUser) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    const inventory = dbUser?.inventory;

    if (!inventory || !inventory?.[0]) {
      return interaction.reply({
        content: lang.ECONOMY.INV_EMPTY,
      });
    }

    const mapped = inventory?.map((item) => item).join(",\n ");

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`${user.username} ${lang.ECONOMY.INVENTORY}`)
      .setDescription(`${mapped}`);

    await interaction.reply({ embeds: [embed] });
  }
}
