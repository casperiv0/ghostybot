import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function dice(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = await bot.utils.getUserById(interaction.user.id, interaction.guildId!);
  if (!user) {
    return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
  }

  const roll = Math.floor(Math.random() * 6) + 1;
  const price = 200;

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`🎲 ${lang.ECONOMY.DICE_LANDED.replace("{roll}", `${roll}`)}`);

  if (roll === 6) {
    embed.setDescription(`🎉 ${lang.ECONOMY.DICE_WON.replace("{price}", `${price}`)}`);
    bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      money: user.money + price,
    });
  } else {
    embed.setDescription(`❌ ${lang.ECONOMY.DICE_LOST.replace("{price}", `${price}`)}`);
  }

  interaction.reply({ embeds: [embed] });
}
