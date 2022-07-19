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
      botPermissions: [DJS.PermissionFlagsBits.ManageMessages],
      memberPermissions: [DJS.PermissionFlagsBits.ManageGuild],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    await this.bot.utils.removeSticky(interaction.channelId);

    await interaction.reply({
      ephemeral: true,
      content: this.bot.utils.translate(lang.ADMIN.STICKY_CLEAR, {
        channel: interaction.channel!.toString(),
      }),
    });
  }
}
