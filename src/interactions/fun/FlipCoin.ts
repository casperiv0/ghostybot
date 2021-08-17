import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class FlipCoinCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "flip-coin",
      description: "Flip a coin",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const replies = [`**${lang.GAMES.LANDED_HEADS}**`, `**${lang.GAMES.LANDED_TAILS}**`];

    const reply = replies[Math.floor(Math.random() * replies.length)];

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle("FlipCoin")
      .setDescription(`${reply}`);

    await interaction.reply({ embeds: [embed] });
  }
}
