import { Bot } from "structures/Bot";
import * as DJS from "discord.js";

export async function avatar(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const user = interaction.options.getUser("user") ?? interaction.user;

  const png = getAvatar(user, "png");
  const webp = getAvatar(user, "webp");
  const jpg = getAvatar(user, "jpg");
  const gif = getAvatar(user, "gif");

  const embed = bot.utils
    .baseEmbed(interaction)
    .setTitle(`${user.username} ${lang.UTIL.AVATAR}`)
    .setDescription(`[png](${png}) | [webp](${webp}) | [jpg](${jpg}) | [gif](${gif})`)
    .setImage(`${webp}`);

  await interaction.reply({ embeds: [embed] });
}

function getAvatar(user: DJS.User, format: DJS.AllowedImageFormat | "gif") {
  return user.displayAvatarURL({
    dynamic: true,
    size: 4096,
    format: format as DJS.AllowedImageFormat,
  });
}
