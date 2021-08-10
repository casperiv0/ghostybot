import * as DJS from "discord.js";
import { getRandomJoke } from "one-liner-joke";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class RandomJokeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "random-joke",
      description: "Returns a random joke",
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(interaction: DJS.CommandInteraction) {
    await interaction.reply({
      content: getRandomJoke({ exclude_tags: ["dirty", "racist", "marriage", "sex", "death"] })
        .body,
    });
  }
}
