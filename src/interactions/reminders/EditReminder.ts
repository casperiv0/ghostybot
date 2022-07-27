import * as DJS from "discord.js";
import ms from "ms";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class EditReminderCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "reminders",
      name: "edit",
      description: "Edit one of your reminders",
      options: [
        {
          description: "The id of the reminder you want to edit",
          name: "id",
          required: true,
          type: DJS.ApplicationCommandOptionType.String,
        },
        {
          name: "time",
          description: "When the reminder should expire (eg: 1d, 10h, 20min, ..)",
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
        {
          name: "message",
          description: "The message you want the bot to remind you of",
          type: DJS.ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    });
  }

  async execute(
    interaction: DJS.ChatInputCommandInteraction<"cached" | "raw">,
    lang: typeof import("@locales/english").default,
  ) {
    const id = interaction.options.getString("id", true);
    const time = interaction.options.getString("time", true);
    const msg = interaction.options.getString("message", true);

    const isValid = ms(time);
    if (!isValid) {
      return interaction.reply({ ephemeral: true, content: lang.REMINDER.INVALID_DATE });
    }

    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    if (!user) {
      return interaction.reply({ ephemeral: true, content: lang.GLOBAL.ERROR });
    }

    if (!user.reminder?.hasReminder) {
      return interaction.reply({ ephemeral: true, content: lang.REMINDER.NO_REMINDER_SET });
    }

    const reminder = user.reminder.reminders.find((r) => r.shortId === id);
    const updated = user.reminder.reminders.filter((r) => r.shortId !== id);

    if (!reminder) {
      return interaction.reply({ ephemeral: true, content: lang.REMINDER.NOT_FOUND });
    }

    const newReminder = {
      time,
      ends_at: Date.now() + ms(time),
      msg,
      channel_id: reminder.channel_id,
      shortId: reminder.shortId,
    };

    this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      reminder: {
        hasReminder: true,
        reminders: [...updated, newReminder],
      },
    });

    await interaction.reply({ ephemeral: true, content: lang.REMINDER.UPDATED });
  }
}
