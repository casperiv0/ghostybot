import Command from "structures/Command";
import Bot from "structures/Bot";
import { Message } from "discord.js";

export default class RemoveReminderCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      usage: "removereminder <id | 'last' | 'first' | 'all'>",
      name: "removereminder",
      description: "Remove your current reminder",
      category: "reminder",
      aliases: ["delreminder"],
      requiredArgs: [{ name: "reminder_id" }],
    });
  }

  async execute(message: Message, args: string[]) {
    let [id] = args;
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);

    try {
      const user = await this.bot.utils.getUserById(message.author.id, message.guild?.id);
      if (!user) return;

      if (user?.reminder.hasReminder === false) {
        return message.channel.send({ content: lang.REMINDER.NO_REMINDER_SET });
      }

      if (id === "all") {
        await this.bot.utils.updateUserById(message.author.id, message.guild?.id, {
          reminder: {
            hasReminder: false,
            reminders: [],
          },
        });

        return message.channel.send({ content: lang.REMINDER.ALL_DELETED });
      }

      switch (id) {
        case "first": {
          id = "1";
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

      await this.bot.utils.updateUserById(message.author.id, message.guild?.id, {
        reminder: {
          hasReminder: user.reminder.reminders?.length - 1 > 0,
          reminders: user.reminder.reminders.filter((reminder) => reminder.id !== id),
        },
      });

      return message.channel.send({ content: lang.REMINDER.REMOVE_SUCCESS });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
