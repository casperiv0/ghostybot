import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import morseCode from "assets/ts/morse";

export async function morse(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const text = interaction.options.getString("text", true);

  const morse = text
    .toLowerCase()
    .replace(/./g, (x) => `${morseCode[x]}\u2001`)
    .trim();

  if (morse.includes("undefined")) {
    return interaction.reply({ ephemeral: true, content: lang.UTIL.TEXT_NOT_SUP });
  }

  await interaction.reply({ content: morse });
}
