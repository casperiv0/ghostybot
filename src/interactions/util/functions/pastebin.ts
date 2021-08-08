import * as DJS from "discord.js";
import { ApiPasteFormat, ExpireDate } from "pastebin-api";
import { Bot } from "structures/Bot";

export async function pastebin(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const code = interaction.options.getString("code", true);
  const extension = interaction.options.getString("extension");
  const expireDate = interaction.options.getString("expire-date") ?? "N";
  const name = interaction.options.getString("filename") ?? "unknown";

  const pasteUrl = await bot.pasteClient
    .createPaste({
      code,
      expireDate: expireDate as ExpireDate,
      publicity: 1,
      format: (extension as ApiPasteFormat) ?? undefined,
      name,
    })
    .catch((e) => e.message);

  if (pasteUrl.startsWith("Bad API request, invalid api_paste_format")) {
    return interaction.reply({
      ephemeral: true,
      content: lang.UTIL.PASTE_INVALID_FORMAT,
    });
  }

  await interaction.reply({ content: pasteUrl });
}
