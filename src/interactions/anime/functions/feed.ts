import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function feed(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = interaction.options.getUser("user") ?? interaction.user;
  const feeding = interaction.user.id === user.id ? "themselves" : user.username;

  const data = await bot.neko.sfw.feed();
  const link = hyperlink(lang.IMAGE.CLICK_TO_VIEW, data.url);

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${interaction.user.username} ${lang.IMAGE.FEEDED} ${feeding}`)
    .setDescription(link)
    .setImage(data.url);

  await interaction.reply({ embeds: [embed] });
}
