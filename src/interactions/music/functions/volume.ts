import { Bot } from "structures/Bot";
import * as DJS from "discord.js";

export async function volume(
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
  const newVol = interaction.options.getNumber("volume", true);

  const queue = bot.player.getQueue(interaction.guildId!);
  if (!queue || !queue.playing) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_QUEUE });
  }

  if (queue && !bot.utils.isBotInSameChannel(interaction)) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
  }

  if (isNaN(Number(newVol))) {
    return interaction.reply({ ephemeral: true, content: lang.LEVELS.PROVIDE_VALID_NR });
  }

  if (!newVol) {
    return interaction.reply({ ephemeral: true, content: lang.LEVELS.PROVIDE_VALID_NR });
  }

  if (Number(newVol) < 0) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.BETWEEN_0_100 });
  }

  if (Number(newVol) > 100) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.BETWEEN_0_100 });
  }

  bot.player.setVolume(interaction.guildId!, Number(newVol));
  await interaction.reply({ content: lang.MUSIC.VOL_SUCCESS.replace("{vol}", newVol.toString()) });
}
