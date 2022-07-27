import * as DJS from "discord.js";
import { request } from "undici";
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

  async execute(interaction: DJS.ChatInputCommandInteraction<"cached">) {
    await interaction.deferReply();
    const data = (await request(this.APIs.Advice).then((res) => res.body.json())) as Data;

    await interaction.editReply({ content: data.slip.advice });
  }
}
