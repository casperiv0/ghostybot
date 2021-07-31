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
    return interaction.reply({ ephemeral: true, content: "Bot is not in this voice channel!" });
  }

  const perms = member.voice.channel?.permissionsFor(bot.user!);
  if (!perms?.has("CONNECT") || !perms.has("SPEAK")) {
    return interaction.reply({ ephemeral: true, content: lang.MUSIC.NO_PERMS });
  }

  await interaction.reply({ ephemeral: true, content: "Song has been added to the queue" });

  const d = {
    ...interaction,
    author: interaction.user,
  };
  const message = new DJS.Message(bot, d, interaction.channel as DJS.TextChannel);
  await bot.player.play(message, search);
}
