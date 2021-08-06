import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function supreme(bot: Bot, interaction: DJS.CommandInteraction) {
  await interaction.deferReply();

  const text = interaction.options.getString("text", true);
  const image = await bot.alexClient.image.supreme({
    text: encodeURIComponent(text),
  });

  const att = new DJS.MessageAttachment(image, "supreme.png");

  await interaction.editReply({ files: [att] });
}
