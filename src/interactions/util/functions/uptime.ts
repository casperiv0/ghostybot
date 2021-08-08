import { time } from "@discordjs/builders";
import * as DJS from "discord.js";
import { Bot } from "structures/Bot";

export async function uptime(
  bot: Bot,
  interaction: DJS.CommandInteraction,
  lang: typeof import("@locales/english").default,
) {
  const uptime = new Date(Date.now() - (bot.uptime ?? 0));
  const botUpSince = time(uptime, "f");
  const relativeUp = time(uptime, "R");

  await interaction.reply({
    content: `${lang.UTIL.BOT_UPTIME.replace("{botUpSince}", botUpSince)} (${relativeUp})`,
  });
}
