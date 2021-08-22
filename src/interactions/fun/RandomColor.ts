import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RandomJokeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "random-color",
      description: "Returns a random color",
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    const color = this.generateColor();
    const preview = `${this.APIs.RandomColor}${color.slice(1, color.length)}`;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setThumbnail(preview)
      .setColor(color)
      .setTitle(color);

    interaction.reply({ embeds: [embed] });
  }

  generateColor(): `#${string}` {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
}
