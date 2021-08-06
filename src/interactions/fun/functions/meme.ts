import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function meme(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.deferReply();

  const data = await fetch("https://meme-api.herokuapp.com/gimme").then((res) => res.json());

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(data.title)
    .setDescription(`${lang.IMAGE.CLICK_TO_VIEW}(${data.url})`)
    .setImage(data.url);

  await interaction.editReply({ embeds: [embed] });
}
