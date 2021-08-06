import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function magik(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.deferReply();

  const user = interaction.options.getUser("user") ?? interaction.user;
  const intensity = interaction.options.getNumber("intensity") ?? Math.floor(Math.random() * 10);

  const data = await fetch(
    `https://nekobot.xyz/api/imagegen?type=magik&intensity=${encodeURIComponent(
      intensity,
    )}&image=${user?.displayAvatarURL({
      format: "png",
    })}`,
  ).then((res) => res.json());

  const embed = bot.utils
    .baseEmbed(interaction)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.message})`)
    .setImage(data.message);

  await interaction.editReply({ embeds: [embed] });
}
