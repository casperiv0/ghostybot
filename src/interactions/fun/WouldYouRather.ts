import * as DJS from "discord.js";
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
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await interaction.deferReply();

    const data = await fetch("http://api.xaliks.xyz/random/wyr").then((res) => res.json());
    const [reply1, reply2] = data.questions;

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(data.title)
      .setDescription(
        `${lang.GAMES.WYR_QUESTIONS.replace("{question1}", reply1.question).replace(
          "{question2}",
          reply2.question,
        )}\n\n\n${data.description || ""}`,
      )
      .addField(lang.GAMES.VOTES, this.bot.utils.formatNumber(data.total_votes), true);

    if (data.author) {
      embed.addField(lang.UTIL.AUTHOR, data.author, true);
    }

    return interaction.editReply({ embeds: [embed] });
  }
}
