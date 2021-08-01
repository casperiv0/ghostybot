import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function ytComment(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const text = interaction.options.getString("text", true);

  const username = interaction.user.username;
  const avatar = interaction.user.displayAvatarURL({
    dynamic: false,
    format: "png",
  });

  const url = `https://some-random-api.ml/canvas/youtube-comment?username=${encodeURIComponent(
    username,
  )}&comment=${encodeURIComponent(text)}&avatar=${encodeURIComponent(avatar)}`;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${url})`)
    .setImage(url);

  await interaction.editReply({ embeds: [embed] });
}
