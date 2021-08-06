import Bot from "structures/Bot";
import * as DJS from "discord.js";

export async function play(
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

  const search = interaction.options.getString("query", true);
  const queue = bot.player.getQueue(interaction.guildId!);

  if (queue && !bot.utils.isBotInSameChannel(interaction)) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.BOT_NOT_IN_VC });
  }

  const perms = member.voice.channel?.permissionsFor(bot.user!);
  if (!perms?.has("CONNECT") || !perms.has("SPEAK")) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_PERMS });
  }

  await interaction.reply({ ephemeral: true, content: lang.MUSIC.ADDED_TO_QUEUE2 });

  const channel = member.voice.channel;

  await bot.player.playVoiceChannel(channel, search);
}
