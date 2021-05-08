import { CommandInteraction } from "discord.js";
import Bot from "../structures/Bot";
import Interaction from "../structures/Interaction";

export default class HelpInteraction extends Interaction {
  constructor(bot: Bot) {
    super(bot, {
      name: "help",
      description: "Return more information about a command",
      options: [
        {
          name: "command",
          type: "STRING",
          description: "The command you're looking for",
          required: true,
        },
      ],
    });
  }

  async execute(
    bot: Bot,
    interaction: CommandInteraction,
    args: (string | number | boolean | undefined)[],
  ) {
    const arg = `${args[0]}`;

    const command = bot.commands.get(arg) ?? bot.commands.get(bot.aliases.get(arg)!);

    if (!command) {
      return interaction.reply("That command was not found");
    } else {
      // TODO:
      interaction.reply(command.name);
    }
  }
}
