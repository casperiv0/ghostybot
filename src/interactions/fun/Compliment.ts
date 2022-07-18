import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { request } from "undici";
import { SubCommand } from "structures/Command/SubCommand";

export default class ComplimentCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "compliment",
      description: "Get a compliment",
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const data = (await request(this.APIs.Compliment).then((res) => res.body.json())) as {
      compliment: string;
    };

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GAMES.COMPLIMENT)
      .setDescription(data.compliment);

    await interaction.editReply({ embeds: [embed] });
  }
}
