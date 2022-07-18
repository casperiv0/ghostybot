import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class DiceCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "dice",
      description: "Roll a dice and win 200 coins",
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    if (!user) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    const roll = Math.floor(Math.random() * 6) + 1;
    const price = 200;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(`🎲 ${this.bot.utils.translate(lang.ECONOMY.DICE_LANDED, { roll })}`);

    if (roll === 6) {
      embed.setDescription(`🎉 ${this.bot.utils.translate(lang.ECONOMY.DICE_WON, { price })}`);
      this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        money: user.money + price,
      });
    } else {
      embed.setDescription(`❌ ${this.bot.utils.translate(lang.ECONOMY.DICE_LOST, { price })}`);
    }

    await interaction.reply({ embeds: [embed] });
  }
}
