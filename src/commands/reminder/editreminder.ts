import { Message } from "discord.js";
import ms from "ms";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Reminder } from "../../models/User.model";

export default class EditReminderCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "edit-reminder",
      description: "Edit an active reminder",
      category: "reminder",
      requiredArgs: [{ name: "id" }, { name: "time", type: "time" }, { name: "description" }],
      usage: "edit-reminder <reminder-id> <new-time> <new message>",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const [id, time, description] = args;

    try {
      const user = await bot.utils.getUserById(message.author.id, message.guild?.id);
      if (!user) {
        return message.channel.send(lang.GLOBAL.ERROR);
      }

      if (!user.reminder.hasReminder) {
        return message.channel.send("You don't have any active reminders");
      }

      const reminder = user.reminder.reminders.find((r) => r.id === +id);
      const updated = user.reminder.reminders.filter((r) => r.id !== +id);

      if (!reminder) {
        return message.channel.send("That reminder was not found");
      }

      reminder.time = time;
      reminder.ends_at = ms(time);
      reminder.msg = description;

      const newReminder: Reminder = {
        time: time,
        ends_at: Date.now() + ms(time),
        msg: description,
        channel_id: reminder.channel_id,
        id: reminder.id,
        _id: reminder._id,
      };

      bot.utils.updateUserById(message.author.id, message.guild?.id, {
        reminder: {
          hasReminder: true,
          reminders: [...updated, newReminder],
        },
      });

      return message.channel.send("Updated reminder");
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
