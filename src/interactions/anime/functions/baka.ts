import { hyperlink } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function baka(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const data = await bot.neko.sfw.baka();
  const link = hyperlink(lang.IMAGE.CLICK_TO_VIEW, data.url);

  const embed = bot.utils.baseEmbed(interaction).setDescription(link).setImage(`${data.url}`);

  await interaction.reply({ embeds: [embed] });
}
