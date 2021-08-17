import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { SubCommand } from "structures/Command/SubCommand";

export default class RemoveReminderCommand extends SubCommand {
  constructor(bot: Bot) {
    super(bot, {
      commandName: "reminders",
      name: "delete",
      description: "Delete one of your reminders",
      options: [
        {
          description: "The id of the reminder you want to delete",
          name: "id",
          required: true,
          type: "STRING",
        },
      ],
    });
  }

  async execute(
    interaction: DJS.CommandInteraction,
    lang: typeof import("@locales/english").default,
  ) {
    let id = interaction.options.getString("id", true);
    const user = await this.bot.utils.getUserById(interaction.user.id, interaction.guildId!);
    if (!user) return;

    if (user?.reminder.hasReminder === false) {
      return interaction.reply({ ephemeral: true, content: lang.REMINDER.NO_REMINDER_SET });
    }

    if (id === "all") {
      await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
        reminder: {
          hasReminder: false,
          reminders: [],
        },
      });

      return interaction.reply({ ephemeral: true, content: lang.REMINDER.ALL_DELETED });
    }

    switch (id) {
      case "first": {
        id = user.reminder.reminders[0].id;
        break;
      }
      case "last": {
        id = user.reminder.reminders[user.reminder.reminders.length - 1].id;
        break;
      }
      default: {
        break;
      }
    }

    await this.bot.utils.updateUserById(interaction.user.id, interaction.guildId!, {
      reminder: {
        hasReminder: user.reminder.reminders?.length - 1 > 0,
        reminders: user.reminder.reminders.filter((reminder) => reminder.id !== id),
      },
    });

    await interaction.reply({ ephemeral: true, content: lang.REMINDER.REMOVE_SUCCESS });
  }
}
