import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function setSticky(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const perms = bot.utils.formatMemberPermissions(
    [DJS.Permissions.FLAGS.MANAGE_GUILD],
    interaction,
    lang,
  );
  if (perms) {
    return interaction.reply({ content: perms, ephemeral: true });
  }

  const botPerms = bot.utils.formatBotPermissions(
    [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
    interaction,
    lang,
  );
  if (botPerms) {
    return interaction.reply({ embeds: [botPerms], ephemeral: true });
  }

  const text = interaction.options.getString("text", true);

  if (text.length > 1800) {
    return interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.STICKY_LONG,
    });
  }

  const msg = `${lang.ADMIN.STICKY_READ}\n\n${text}`;

  await interaction.reply({
    content: "Done!",
    ephemeral: true,
  });

  const channel = (await interaction.guild?.channels
    .fetch(interaction.channelId)
    .catch(() => null)) as DJS.TextChannel | null;

  const stickyMessage = await channel?.send({ content: msg });

  await bot.utils.addSticky(stickyMessage?.id!, interaction.channelId, msg);
}
