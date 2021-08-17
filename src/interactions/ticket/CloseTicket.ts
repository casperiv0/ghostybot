import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class CloseTicket extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "tickets",
      name: "close",
      description: "Close your ticket",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const channel = await interaction.guild?.channels.fetch(interaction.channelId);

    if (!(channel as DJS.TextChannel).name.startsWith(lang.TICKET.TICKET.replace("#{Id}", ""))) {
      return interaction.reply({ ephemeral: true, content: lang.TICKET.CANNOT_DO_ACTION });
    }

    this.bot.emit("guildTicketClose", channel, interaction.user);
    channel?.delete();
  }
}
