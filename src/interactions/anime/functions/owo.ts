import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function owo(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const data = await fetch("https://rra.ram.moe/i/r?type=owo").then((res) => res.json());

  const link = hyperlink(
    lang.IMAGE.CLICK_TO_VIEW,
    `https://cdn.ram.moe/${data.path.replace("/i/", "")}`,
  );

  const embed = bot.utils
    .baseEmbed(interaction)
    .setDescription(link)
    .setImage(`https://cdn.ram.moe/${data.path.replace("/i/", "")}`);

  await interaction.reply({ embeds: [embed] });
}
