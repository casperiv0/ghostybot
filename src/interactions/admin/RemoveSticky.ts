import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RemoveStickyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "sticky",
      name: "remove",
      description: "Remove the sticky message for the current channel",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    await this.bot.utils.removeSticky(interaction.channelId);

    await interaction.reply({
      ephemeral: true,
      content: lang.ADMIN.STICKY_CLEAR.replace("{channel}", `${interaction.channel}`),
    });
  }
}
