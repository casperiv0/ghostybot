import { create, all } from "mathjs";
import { codeBlock } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
const math = create(all);

export async function calc(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const calculation = interaction.options.getString("calculation", true);

  const result = math?.evaluate?.(calculation);

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.GAMES.CALC)
    .addField(lang.BOT_OWNER.EVAL_INPUT, codeBlock("js", calculation))
    .addField(lang.BOT_OWNER.EVAL_OUTPUT, codeBlock("js", result));

  await interaction.reply({ embeds: [embed] });
}
