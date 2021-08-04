import Bot from "structures/Bot";
import * as DJS from "discord.js";

export async function nowPlaying(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const queue = bot.player.getQueue(interaction.guildId!);

  if (!queue || !queue.playing) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
  }

  const [song] = queue.songs;
  if (!song) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
  }

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(song.name ?? "Unknown")
    .setURL(song.url)
    .setAuthor(`🎵 ${lang.MUSIC.NOW} ${lang.MUSIC.PLAYING} `)
    .setDescription(`**${lang.MUSIC.DURATION}:** ${song.formattedDuration}`)
    .addField(
      "Information",
      `
**Uploader:** ${song.uploader.name ?? "Unknown"}
**Likes:** ${bot.utils.formatNumber(song.likes)}`,
    );

  if (song.thumbnail) {
    embed.setImage(song.thumbnail);
  }

  interaction.reply({ embeds: [embed] });
}
