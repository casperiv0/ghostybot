import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class RandomJokeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "random-color",
      description: "Returns a random color",
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(interaction: DJS.CommandInteraction) {
    const color = this.generateColor();
    const preview = `https://api.no-api-key.com/api/v2/color?hex=${color.slice(1, color.length)}`;

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
