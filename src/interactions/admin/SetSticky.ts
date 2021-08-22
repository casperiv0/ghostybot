import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class SetStickyCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "admin",
      groupName: "sticky",
      name: "set",
      description: "Set a new sticky message for the current channel",
      botPermissions: [DJS.Permissions.FLAGS.MANAGE_MESSAGES],
      memberPermissions: [DJS.Permissions.FLAGS.MANAGE_GUILD],
      options: [
        {
          name: "text",
          required: true,
          description: "The text you want as a sticky message",
          type: "STRING",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    const text = interaction.options.getString("text", true);

    if (text.length > 1800) {
      return interaction.reply({
        ephemeral: true,
        content: lang.ADMIN.STICKY_LONG,
      });
    }

    const msg = `${lang.ADMIN.STICKY_READ}\n\n${text}`;

    await interaction.reply({
      content: "Done!",
      ephemeral: true,
    });

    const channel = (await interaction.guild?.channels
      .fetch(interaction.channelId)
      .catch(() => null)) as DJS.TextChannel | null;

    const stickyMessage = await channel?.send({ content: msg });

    await this.bot.utils.addSticky(stickyMessage?.id!, interaction.channelId, msg);
  }
}
