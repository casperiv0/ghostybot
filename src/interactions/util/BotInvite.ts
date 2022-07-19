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

  async execute(interaction: DJS.ChatInputCommandInteraction<"cached">) {
    const invite = this.bot.generateInvite({
      scopes: [DJS.OAuth2Scopes.Bot, DJS.OAuth2Scopes.ApplicationsCommands],
      permissions: `${8}`,
    });

    await interaction.reply({ content: invite });
  }
}
