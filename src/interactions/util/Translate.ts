import * as DJS from "discord.js";
import googleTranslate from "@iamtraction/google-translate";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class TranslateCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "translate",
      description: "Translate something",
      options: [
        {
          name: "language",
          description: "The language you want to translate to",
          type: "STRING",
          required: true,
        },
        {
          name: "sentence",
          description: "The sentence you want to translate",
          type: "STRING",
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const language = interaction.options.getString("language", true);
    const sentence = interaction.options.getString("sentence", true);

    const result = await googleTranslate(sentence, { to: language });

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setDescription(result.text)
      .setTitle(lang.UTIL.G_TRANSLATE);

    await interaction.reply({ embeds: [embed] });
  }
}
