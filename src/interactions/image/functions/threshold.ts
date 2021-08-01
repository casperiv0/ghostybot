import * as DJS from "discord.js";
import Bot from "structures/Bot";

const API_URL = "https://some-random-api.ml/canvas/threshold?avatar=";

export async function threshold(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const user = interaction.options.getUser("user") ?? interaction.user;
  const image = `${API_URL}${user.displayAvatarURL({ format: "png" })}`;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${image})`)
    .setImage(image);

  await interaction.reply({ embeds: [embed] });
}
