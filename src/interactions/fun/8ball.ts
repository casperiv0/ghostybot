import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class Ball8Command extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "fun",
      name: "8ball",
      description: "8Ball",
      options: [
        {
          type: DJS.ApplicationCommandOptionType.String,
          description: "The question that needs to be answered",
          name: "question",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const answers = lang.OTHER.ANSWERS;
    const question = interaction.options.getString("question", true);
    const answer = answers[Math.floor(Math.random() * answers.length)];

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle("8Ball")
      .addFields(
        { name: `${lang.GAMES.QUESTION}:`, value: question },
        { name: `${lang.GAMES.ANSWER}:`, value: answer },
      );

    await interaction.reply({ embeds: [embed] });
  }
}
