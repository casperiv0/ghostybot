import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function balance(
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
    .setTitle(`${user.username} ${lang.ECONOMY.BALANCE}`)
    .addField(lang.ECONOMY.MONEY, bot.utils.formatNumber(dbUser.money), true)
    .addField(lang.ECONOMY.BANK, bot.utils.formatNumber(dbUser.bank), true)
    .addField(lang.COVID.TOTAL, bot.utils.formatNumber(dbUser.bank + dbUser.money), true);

  interaction.reply({ embeds: [embed] });
}
