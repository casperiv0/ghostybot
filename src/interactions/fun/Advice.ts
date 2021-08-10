import * as DJS from "discord.js";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class AdviceCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "advice",
      description: "Gives you advice",
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(interaction: DJS.CommandInteraction) {
    await interaction.deferReply();
    const data = await fetch("https://api.adviceslip.com/advice").then((res) => res.json());

    await interaction.editReply({ content: data.slip.advice });
  }
}
