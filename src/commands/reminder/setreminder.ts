import { Message } from "discord.js";
import ms from "ms";
import { v4 } from "uuid";
import Command from "structures/Command";
import Bot from "structures/Bot";

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

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const [time, ...rest] = args;
      const msg = rest.join(" ");

      const isValid = ms(time);
      if (!isValid) {
        return message.channel.send({ content: lang.REMINDER.INVALID_DATE });
      }

      const user = await this.bot.utils.getUserById(message.author.id, message.guild?.id);
      if (!user) return;
      const reminders = typeof user.reminder.reminders === "object" ? user.reminder.reminders : [];

      await this.bot.utils.updateUserById(message.author.id, message.guild?.id, {
        reminder: {
          hasReminder: true,
          reminders: [
            ...reminders,
            {
              ends_at: Date.now() + ms(time),
              msg,
              channel_id: message.channel.id,
              time,
              id: v4().slice(0, 8),
              _id: v4(),
            },
          ],
        },
      });

      return message.channel.send({ content: lang.REMINDER.SUCCESS.replace("{time}", time) });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send({ content: lang.GLOBAL.ERROR });
    }
  }
}
