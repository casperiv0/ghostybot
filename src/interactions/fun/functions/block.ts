import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function block(bot: Bot, interaction: DJS.CommandInteraction) {
  const text = interaction.options.getString("text", true);

  const blocks = text
    .toLowerCase()
    .replace(/[a-z]/g, ":regional_indicator_$&:")
    .replace(/1/g, ":one:")
    .replace(/2/g, ":two:")
    .replace(/3/g, ":three:")
    .replace(/4/g, ":four:")
    .replace(/5/g, ":five:")
    .replace(/6/g, ":six:")
    .replace(/7/g, ":seven:")
    .replace(/8/g, ":eight:")
    .replace(/9/g, ":nine:")
    .replace(/0/g, ":zero:");

  const embed = bot.utils.baseEmbed(interaction).setDescription(blocks);

  await interaction.reply({ embeds: [embed] });
}
