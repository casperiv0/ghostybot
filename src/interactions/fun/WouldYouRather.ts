import * as DJS from "discord.js";
import { request } from "undici";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class WouldYouRatherCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "would-you-rather",
      description: "Would you rather..",
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached">,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const data = await request("http://api.xaliks.xyz/random/wyr").then((res) => res.body.json());
    const [reply1, reply2] = data.questions;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(data.title)
      .setDescription(
        `${this.bot.utils.translate(lang.GAMES.WYR_QUESTIONS, {
          question1: reply1.question,
          question2: reply2.question,
        })}\n\n\n${data.description || ""}`,
      )
      .addField({
        name: lang.GAMES.VOTES,
        value: this.bot.utils.formatNumber(data.total_votes),
        inline: true,
      });

    if (data.author) {
      embed.addField({ name: lang.UTIL.AUTHOR, value: data.author, inline: true });
    }

    return interaction.editReply({ embeds: [embed] });
  }
}
