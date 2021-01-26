import Command from "../../structures/Command";
import Bot from "../../structures/Bot";
import { Message } from "discord.js";

export default class RemoveReminderCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "removereminder",
      description: "Remove your current reminder",
      category: "reminder",
      aliases: ["delreminder"],
      requiredArgs: [{ name: "reminder_id" }],
    });
  }

  async execute(bot: Bot, message: Message, args: string[]) {
    const [id] = args;
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    try {
      const user = await bot.utils.getUserById(message.author.id, message.guild?.id);
      if (!user) return;

      if (user?.reminder.hasReminder === false) {
        return message.channel.send(lang.REMINDER.NO_REMINDER_SET);
      }

      await bot.utils.updateUserById(message.author.id, message.guild?.id, {
        reminder: {
          hasReminder: user.reminder.reminders?.length - 1 > 0,
          reminders: user.reminder.reminders.filter((reminder) => reminder.id !== +id),
        },
      });

      return message.channel.send(lang.REMINDER.REMOVE_SUCCESS);
    } catch (err) {
      bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
