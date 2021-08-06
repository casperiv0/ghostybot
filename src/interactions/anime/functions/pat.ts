import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function pat(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = interaction.options.getUser("user") ?? interaction.user;
  const patted = interaction.user.id === user.id ? "themselves" : user.username;

  const data = await bot.neko.sfw.pat();
  const link = hyperlink(lang.IMAGE.CLICK_TO_VIEW, data.url);

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${interaction.user.username} ${lang.IMAGE.PATTED} ${patted}`)
    .setDescription(link)
    .setImage(data.url);

  await interaction.reply({ embeds: [embed] });
}
