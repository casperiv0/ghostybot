import Bot from "structures/Bot";
import * as DJS from "discord.js";

export async function remove(
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

  const songNo = interaction.options.getNumber("position", true);
  const queue = bot.player.getQueue(interaction.guildId!);

  if (!queue || !queue.playing) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
  }

  if (queue && !bot.utils.isBotInSameChannel(interaction)) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
  }

  if (isNaN(Number(songNo))) {
    return interaction.reply({ ephemeral: true, content: lang.LEVELS.PROVIDE_VALID_NR });
  }

  if (Number(songNo) < 1) {
    return interaction.reply({
      ephemeral: true,
      content: lang.MUSIC.BETWEEN_1_TOTALQUEUE.replace("{totalQueue}", `${queue.songs.length - 1}`),
    });
  }

  if (Number(songNo) >= queue.songs.length) {
    return interaction.reply({
      ephemeral: true,
      content: lang.MUSIC.BETWEEN_1_TOTALQUEUE.replace("{totalQueue}", `${queue.songs.length - 1}`),
    });
  }

  const song = queue.songs[Number(songNo)];
  queue.songs.splice(Number(songNo), 1);

  await interaction.reply({
    content: `**${song.name}** ${lang.MUSIC.REMOVE_SUCCESS}`,
  });
}
