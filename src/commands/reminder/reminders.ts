import { Message } from "discord.js";
import dayJs from "dayjs";
import duration from "dayjs/plugin/duration";
dayJs.extend(duration);
import Command from "structures/Command";
import Bot from "structures/Bot";

export default class RemindersCommand extends Command {
  constructor(bot: Bot) {
    super(bot, {
      name: "reminders",
      description: "All your active reminders",
      category: "reminder",
    });
  }

  async execute(message: Message, args: string[]) {
    const lang = await this.bot.utils.getGuildLang(message.guild?.id);
    try {
      const member = await this.bot.utils.findMember(message, args, { allowAuthor: true });

      if (!member) {
        return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
      }

      const user = await this.bot.utils.getUserById(member.user.id, message.guild?.id);
      if (!user) return;

      if (!user.reminder.hasReminder === true) {
        return message.channel.send(lang.REMINDER.NO_ACTIVE_REM);
      }

      const mappedReminders = user.reminder.reminders.map((reminder) => {
        const endsAt = dayJs
          .duration(reminder.ends_at - Date.now())
          .format("YY [years], D [days], H [hrs], m [mins], s [secs]");

        return `**${lang.REMINDER.MESSAGE}** ${reminder.msg}
  **${lang.REMINDER.TIME}** ${reminder.time}
  **${lang.MEMBER.ID}:** ${reminder.id}
  **${lang.REMINDER.ENDS_IN}** ${endsAt}`;
      });

      const embed = this.bot.utils
        .baseEmbed(message)
        .setTitle(lang.REMINDER.USER_REMINDERS.replace("{memberUsername}", member.user.username))
        .setDescription(mappedReminders.join("\n\n"));

      return message.channel.send({ embeds: [embed] });
    } catch (err) {
      this.bot.utils.sendErrorLog(err, "error");
      return message.channel.send(lang.GLOBAL.ERROR);
    }
  }
}
