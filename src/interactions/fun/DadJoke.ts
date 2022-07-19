import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { request } from "undici";
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

  async execute(interaction: DJS.ChatInputCommandInteraction<"cached">) {
    await interaction.deferReply();

    const data = (await request(this.APIs.DadJoke).then((res) => res.body.json())) as Data;

    await interaction.editReply({ content: data.attachments[0].fallback });
  }
}
