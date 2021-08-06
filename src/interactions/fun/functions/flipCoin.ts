import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function flipCoin(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const replies = [`**${lang.GAMES.LANDED_HEADS}**`, `**${lang.GAMES.LANDED_TAILS}**`];

  const reply = replies[Math.floor(Math.random() * replies.length)];

  const embed = bot.utils.baseEmbed(interaction).setTitle("FlipCoin").setDescription(`${reply}`);

  await interaction.reply({ embeds: [embed] });
}
