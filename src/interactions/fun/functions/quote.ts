import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function quote(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.deferReply();

  const data = await fetch("https://api.tovade.xyz/v1/fun/quote").then((r) => r.json());

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.GAMES.QUOTE)
    .setDescription(data.content)
    .addField(lang.UTIL.AUTHOR, `${data.author} (${data.id})`)
    .addField(lang.GAMES.TAGS, data.tags.join(", "));

  await interaction.editReply({ embeds: [embed] });
}
