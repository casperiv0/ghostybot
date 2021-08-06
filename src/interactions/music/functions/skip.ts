import { Bot } from "structures/Bot";
import * as DJS from "discord.js";

export async function skip(
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

  if (queue && !bot.utils.isBotInSameChannel(interaction)) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
  }

  if (queue.songs.length <= 1) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.ERRORS.NO_UP_NEXT });
  }

  bot.player.skip(interaction.guildId!);

  interaction.reply({ content: "👍" });
}
