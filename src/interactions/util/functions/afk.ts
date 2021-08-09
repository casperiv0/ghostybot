import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function afk(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const guildId = interaction.guild?.id;
  const userId = interaction.user.id;
  const user = await bot.utils.getUserById(userId, guildId);

  if (user?.afk?.is_afk) {
    await bot.utils.updateUserById(userId, guildId, {
      afk: { is_afk: false, reason: null },
    });

    const embed = bot.utils
      .baseEmbed(interaction)
      .setTitle(lang.GLOBAL.SUCCESS)
      .setDescription(lang.UTIL.NOT_AFK);

    return interaction.reply({ embeds: [embed] });
  }

  const reason = interaction.options.getString("reason") ?? lang.GLOBAL.NOT_SPECIFIED;

  await bot.utils.updateUserById(userId, guildId, {
    afk: { is_afk: true, reason },
  });

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(lang.GLOBAL.SUCCESS)
    .setDescription(`${lang.UTIL.AFK}\n**${lang.GLOBAL.REASON}:** ${reason}`);

  await interaction.reply({ embeds: [embed] });
}
