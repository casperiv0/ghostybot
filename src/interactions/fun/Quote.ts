import * as DJS from "discord.js";
import fetch from "node-fetch";
import { Bot } from "structures/Bot";
import { ValidateReturn } from "structures/Command/Command";
import { SubCommand } from "structures/Command/SubCommand";

export default class QuoteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "quote",
      description: "Returns a random quote",
    });
  }

  async validate(): Promise<ValidateReturn> {
    return { ok: true };
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const data = await fetch("https://api.tovade.xyz/v1/fun/quote").then((r) => r.json());

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GAMES.QUOTE)
      .setDescription(data.content)
      .addField(lang.UTIL.AUTHOR, `${data.author} (${data.id})`)
      .addField(lang.GAMES.TAGS, data.tags.join(", "));

    await interaction.editReply({ embeds: [embed] });
  }
}
