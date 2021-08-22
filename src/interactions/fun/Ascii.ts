import * as DJS from "discord.js";
import figlet from "figlet";
import { codeBlock } from "@discordjs/builders";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class AsciiCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "ascii",
      description: "Transform text to ascii",
      options: [
        {
          name: "text",
          description: "The text you want to transform",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    const text = interaction.options.getString("text", true);

    figlet.text(text, (e, txt) => {
      if (e) return;

      interaction.reply({
        content: codeBlock(txt?.trimRight() ?? "UNKNOWN"),
      });
    });
  }
}
