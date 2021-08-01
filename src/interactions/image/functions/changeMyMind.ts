import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function changeMyMind(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const text = interaction.options.getString("text", true);

  const data = await fetch(
    `https://nekobot.xyz/api/imagegen?type=changemymind&text=${encodeURIComponent(text)}`,
  ).then((res) => res.json());

  const embed = bot.utils
    .baseEmbed(interaction)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
    .setImage(data.message);

  await interaction.editReply({ embeds: [embed] });
}
