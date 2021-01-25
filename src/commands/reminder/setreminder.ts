import { Message } from "discord.js";
import ms from "ms";
import { v4 } from "uuid";
import Command from "../../structures/Command";
import Bot from "../../structures/Bot";

export default class SetReminderCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "setreminder",
      description: "Set a reminder, the bot will ping you when the timer runs out",
      category: "reminder",
      requiredArgs: [{ type: "time", name: "time" }, { name: "message" }],
      aliases: ["addreminder", "remind", "remindme"],
      usage: "<time> <message>",
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const [time, ...rest] = args;
      const msg = rest.join(" ");

      const isValid = ms(time);
      if (!isValid) {
        return message.channel.send(lang.REMINDER.INVALID_DATE);
      }

      const user = await bot.utils.getUserById(message.author.id, message.guild?.id);
      if (!user) return;
      const reminders = typeof user.reminder.reminders === "object" ? user.reminder.reminders : [];

      await bot.utils.updateUserById(message.author.id, message.guild?.id, {
        reminder: {
          hasReminder: true,
          reminders: [
            ...reminders,
            {
              ends_at: Date.now() + ms(time),
              msg,
              channel_id: message.channel.id,
              time,
              id: reminders.length + 1,
              _id: v4(),
            },
          ],
        },
      });

      return message.channel.send(lang.REMINDER.SUCCESS.replace("{time}", time));
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
