import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function wouldYouRather(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  await interaction.defer();

  const data = await fetch("http://api.xaliks.xyz/random/wyr").then((res) => res.json());
  const [reply1, reply2] = data.questions;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(data.title)
    .setDescription(`${reply1.question} **OR** ${reply2.question}\n\n\n${data.description || ""}`)
    .addField("Votes", bot.utils.formatNumber(data.total_votes), true);

  if (data.author) {
    embed.addField(lang.UTIL.AUTHOR, data.author, true);
  }

  return interaction.editReply({ embeds: [embed] });
}
