import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function xp(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = interaction.options.getUser("user") ?? interaction.user;
  if (user.bot) {
    return interaction.reply({ ephemeral: true, content: lang.MEMBER.BOT_DATA });
  }

  const dbUser = await bot.utils.getUserById(user.id, interaction.guildId!);
  if (!dbUser) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${user.username} ${lang.LEVELS.XP}`)
    .setDescription(`${lang.LEVELS.XP}: ${bot.utils.formatNumber(dbUser.xp)}`);

  await interaction.reply({
    embeds: [embed],
  });
}
