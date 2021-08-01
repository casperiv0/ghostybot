import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function supreme(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const text = interaction.options.getString("text", true);
  const image = await bot.alexClient.image.supreme({
    text: encodeURIComponent(text),
  });

  const att = new DJS.MessageAttachment(image, "supreme.png");

  await interaction.reply({ files: [att] });
}
