import * as DJS from "discord.js";
import { codeBlock } from "@discordjs/builders";
import { create, all } from "mathjs";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

const math = create(all);

export default class CalculateCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "calculate",
      description: "Calculate something",
      options: [
        {
          name: "calculation",
          required: true,
          description: "What you want to calculate",
          type: "STRING",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const calculation = interaction.options.getString("calculation", true);

    const result = math?.evaluate?.(calculation);

    const embed = this.bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GAMES.CALC)
      .addField(lang.BOT_OWNER.EVAL_INPUT, codeBlock("js", calculation))
      .addField(lang.BOT_OWNER.EVAL_OUTPUT, codeBlock("js", result));

    await interaction.reply({ embeds: [embed] });
  }
}
