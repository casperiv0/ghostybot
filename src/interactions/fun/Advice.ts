import * as DJS from "discord.js";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

interface Data {
  slip: {
    id: number;
    advice: string;
  };
}

export default class AdviceCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "advice",
      description: "Gives you advice",
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    await interaction.deferReply();
    const data = (await fetch(this.APIs.Advice).then((res) => res.json())) as Data;

    await interaction.editReply({ content: data.slip.advice });
  }
}
