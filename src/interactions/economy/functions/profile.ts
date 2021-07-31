import { bold } from "@discordjs/builders";
import * as DJS from "discord.js";
import Bot from "structures/Bot";

export async function profile(
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

  const { money, bank, inventory, xp } = dbUser;
  const level = bot.utils.calculateXp(xp);

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${user.username} ${lang.ECONOMY.PROFILE}`)
    .setDescription(
      `
${bold(lang.LEVELS.XP)}: ${bot.utils.formatNumber(xp)}
${bold(lang.LEVELS.LEVEL)}: ${level}
${bold(lang.ECONOMY.MONEY)}: ${bot.utils.formatNumber(money)}
${bold(lang.ECONOMY.BANK)}: ${bot.utils.formatNumber(bank)}
    `,
    )
    .addField(bold(lang.ECONOMY.INV_ITEMS), inventory.length.toString(), true);

  interaction.reply({ embeds: [embed] });
}
