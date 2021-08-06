import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function clyde(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.deferReply();

  const text = interaction.options.getString("text", true);

  const data = await fetch(
    `https://nekobot.xyz/api/imagegen?type=clyde&text=${encodeURIComponent(text)}`,
  ).then((res) => res.json());

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.IMAGE.CLYDE)
    .setImage(data.message)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`);

  await interaction.editReply({ embeds: [embed] });
}
