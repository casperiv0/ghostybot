import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

const items = ["🍒", "🍓", "🍉", "🍌", "🍪", "🍏", "🍎"];

export default class SlotsCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "economy",
      name: "slots",
      description: "Play the slots machine",
      options: [
        {
          type: "NUMBER",
          required: false,
          name: "amount",
          description: "An amount you want to bet",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    let amount = Number(interaction.options.getNumber("amount"));
    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    if (!user) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    const numbers: number[] = [];
    let hasWon = false;

    if (amount < 0) {
      return interaction.reply({
        content: lang.ECONOMY.MIN_BET,
        ephemeral: true,
      });
    }

    if (amount > 500) {
      return interaction.reply({
        content: lang.ECONOMY.MAX_BET,
        ephemeral: true,
      });
    }

    if (amount > user.money) {
      return interaction.reply({
        content: lang.ECONOMY.NOT_ENOUGH_MONEY,
        ephemeral: true,
      });
    }

    for (let i = 0; i < 3; i++) {
      const random = Math.floor(Math.random() * items.length);
      numbers[i] = random;
    }

    const isAll = numbers[0] === numbers[1] && numbers[1] === numbers[2];
    const isOne =
      numbers[0] === numbers[1] || numbers[1] === numbers[2] || numbers[0] === numbers[2];

    if (isAll) {
      amount = amount ? (amount *= 5) : 300;
      hasWon = true;
    } else if (isOne) {
      amount = amount ? (amount *= 3) : 150;
      hasWon = true;
    }

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(`${items[numbers[0]]} ${items[numbers[1]]} ${items[numbers[2]]}`);

    if (hasWon) {
      embed.setTitle(lang.ECONOMY.WON_SLOTS.replace("{amount}", `${amount}`));
      await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        money: user.money + amount,
      });
    } else {
      const removalCount = amount ? amount : 0;
      embed.setTitle(lang.ECONOMY.LOST_SLOTS);
      await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        money: user.money - removalCount,
      });
    }

    await interaction.reply({ embeds: [embed] });
  }
}
