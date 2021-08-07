import { Bot } from "structures/Bot";
import * as DJS from "discord.js";

export async function serverIcon(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const icon = interaction.guild?.iconURL({ dynamic: true, size: 2048 });

  if (!icon) {
    interaction.reply({ content: lang.UTIL.NO_GUILD_ICON });
  } else {
    const embed = bot.utils.baseEmbed(interaction).setImage(icon);

    interaction.reply({ embeds: [embed] });
  }
}
