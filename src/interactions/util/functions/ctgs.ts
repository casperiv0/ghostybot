import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function ctgs(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const slug = interaction.options.getString("slug", true);
  const url = interaction.options.getString("url", true);
  const data = await bot.ctgs.new(slug, url).catch((e) => e?.message ?? e);

  await interaction.reply({ content: data });
}
