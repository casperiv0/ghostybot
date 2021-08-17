import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

import morseCode from "assets/ts/morse";

export default class MorseCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "morse",
      description: "Transform text to morse code",
      options: [
        {
          name: "text",
          type: "STRING",
          description: "The text you want to transform",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const text = interaction.options.getString("text", true);

    const morse = text
      .toLowerCase()
      .replace(/./g, (x) => `${morseCode[x]}\u2001`)
      .trim();

    if (morse.includes("undefined")) {
      return interaction.reply({ ephemeral: true, content: lang.UTIL.TEXT_NOT_SUP });
    }

    await interaction.reply({ content: morse });
  }
}
