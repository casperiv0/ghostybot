import Bot from "structures/Bot";
import * as DJS from "discord.js";

export async function nowPlaying(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const member = await bot.utils.findMember(interaction, [interaction.user.id], {
    allowAuthor: true,
  });

  if (!member?.voice.channel) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.MUST_BE_IN_VC });
  }

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
    .setTitle(song.name ?? lang.UTIL.UNKNOWN)
    .setURL(song.url)
    .setAuthor(`🎵 ${lang.MUSIC.NOW} ${lang.MUSIC.PLAYING} `)
    .setDescription(`**${lang.MUSIC.DURATION}:** ${song.formattedDuration}`)
    .addField(
      lang.MUSIC.INFORMATION,
      `
**${lang.MUSIC.UPLOADER}:** ${song.uploader.name ?? lang.UTIL.UNKNOWN}
**${lang.MUSIC.LIKES}:** ${bot.utils.formatNumber(song.likes)}`,
    );

  if (song.thumbnail) {
    embed.setImage(song.thumbnail);
  }

  interaction.reply({ embeds: [embed] });
}
