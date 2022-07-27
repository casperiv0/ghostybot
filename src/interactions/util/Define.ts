import * as DJS from "discord.js";
import wd from "word-definition";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class DefineCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "define",
      description: "Define something",
      options: [
        {
          name: "word",
          required: true,
          description: "The word you want to get defined",
          type: DJS.ApplicationCommandOptionType.String,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const word = interaction.options.getString("word", true);

    wd.getDef(word.toLowerCase(), "en", null, (data) => {
      if (data.err) {
        interaction.reply({
          ephemeral: true,
          content: this.bot.utils.translate(lang.UTIL.NO_DEF_FOUND, { word }),
        });
      } else {
        const embed = this.bot.utils
          .baseEmbed(interaction)
          .setTitle(this.bot.utils.translate(lang.UTIL.DEF_FOR_WORD, { word }))
          .addFields(
            { name: lang.UTIL.CATEGORY, value: data.category },
            { name: lang.UTIL.DEFINITION, value: data.definition },
          );

        interaction.reply({ embeds: [embed] });
      }
    });
  }
}
