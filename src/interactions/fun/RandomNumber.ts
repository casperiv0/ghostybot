import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RandomNumberCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "random-number",
      description: "Returns a random number",
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    await interaction.reply({
      content: (Math.floor(Math.random() * 1000000) + 1).toString(),
    });
  }
}
