import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class BotInviteCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "util",
      name: "bot-invite",
      description: "Generate a bot invite URL for GhostyBot",
    });
  }

  async execute(interaction: DJS.CommandInteraction) {
    const invite = this.bot.generateInvite({
      scopes: ["bot", "applications.commands"],
      permissions: `${8}`,
    });

    await interaction.reply({ content: invite });
  }
}
