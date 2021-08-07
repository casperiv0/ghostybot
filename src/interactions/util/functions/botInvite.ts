import { Bot } from "structures/Bot";
import * as DJS from "discord.js";

export async function botInvite(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const invite = bot.generateInvite({
    scopes: ["bot", "applications.commands"],
    permissions: `${8}`,
  });

  await interaction.reply({ content: invite });
}
