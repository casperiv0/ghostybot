import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import fetch from "node-fetch";
import { SubCommand } from "structures/Command/SubCommand";

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

    const data = await fetch("https://icanhazdadjoke.com/slack").then((res) => res.json());

    await interaction.editReply({ content: data.attachments[0].fallback });
  }
}
