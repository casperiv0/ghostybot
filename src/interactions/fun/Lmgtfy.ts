import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class LmgtfyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "lmgtfy",
      description: "Let me google that for ya?",
      options: [
        {
          required: true,
          type: DJS.ApplicationCommandOptionType.String,
          name: "query",
          description: "The search query",
        },
      ],
    });
  }

  async execute(interaction: DJS.ChatInputCommandInteraction) {
    const query = interaction.options.getString("query", true);
    const url = `${this.APIs.Lmgtfy}${encodeURIComponent(query)}`;

    return interaction.reply({ content: url });
  }
}
