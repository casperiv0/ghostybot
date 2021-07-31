import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function lmgtfy(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const query = interaction.options.getString("query", true);
  const url = `https://lmgtfy.com/?q=${encodeURIComponent(query)}&s=g`;

  return interaction.reply({ content: url });
}
