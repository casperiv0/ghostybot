import * as DJS from "discord.js";
import Bot from "structures/Bot";

const API_URL = "https://some-random-api.ml/img/pikachu";

export async function pikachu(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const data = await fetch(API_URL).then((res) => res.json());

  const embed = bot.utils
    .baseEmbed(interaction)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.link})`)
    .setImage(data.link);

  await interaction.editReply({ embeds: [embed] });
}
