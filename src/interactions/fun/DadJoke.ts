import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import fetch from "node-fetch";
import { SubCommand } from "structures/Command/SubCommand";

interface Data {
  attachments: {
    fallback: string;
    footer: string;
    text: string;
  }[];
  username: string;
}

export default class DadJokeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "dad-joke",
      description: "Returns a dad joke",
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    await interaction.deferReply();

    const data = (await fetch(this.APIs.DadJoke).then((res) => res.json())) as Data;

    await interaction.editReply({ content: data.attachments[0].fallback });
  }
}
