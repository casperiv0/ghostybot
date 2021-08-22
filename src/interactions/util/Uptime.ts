import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";
import { time } from "@discordjs/builders";

export default class UptimeCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "uptime",
      description: "View the uptime of the bot",
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const uptime = new Date(Date.now() - (this.bot.uptime ?? 0));
    const botUpSince = time(uptime, "f");
    const relativeUp = time(uptime, "R");

    await interaction.reply({
      content: `${lang.UTIL.BOT_UPTIME.replace("{botUpSince}", botUpSince)} (${relativeUp})`,
    });
  }
}
