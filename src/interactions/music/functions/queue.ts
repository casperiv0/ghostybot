import { Bot } from "structures/Bot";
import * as DJS from "discord.js";

export async function queue(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const queue = bot.player.getQueue(interaction.guildId!);
  if (!queue) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
  }

  const tracks = queue.songs
    .map((track, idx) => {
      return `${idx === 0 ? `**${lang.MUSIC.NOW_PLAYING}**` : `**${idx}:**`} ${track.name}`;
    })
    .slice(0, 20)
    .join("\n");

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${interaction.guild?.name} ${lang.MUSIC.QUEUE}`)
    .setDescription(tracks);

  interaction.reply({ embeds: [embed] });
}
