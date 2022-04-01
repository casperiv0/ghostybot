import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Helper } from "structures/Helper";
import { prisma } from "utils/prisma";

export default class ReminderHelper extends Helper {
  private TEN_SECOND_INTERVAL = 10_000;

  constructor(bot: Bot) {
    super(bot, "reminderHelper");
  }

  async execute() {
    setInterval(async () => {
      const users = await prisma.users.findMany();
      const reminders = users.filter((v) => v.reminder.hasReminder);
      if (reminders.length <= 0) return;

      reminders.forEach((user) => {
        user.reminder.reminders
          .filter((r) => r.ends_at <= Date.now())
          .forEach(async (reminder) => {
            const guild = this.bot.guilds.cache.get(user.guild_id);
            if (!guild) return;

            const { channel_id, msg, time, shortId: reminderId } = reminder;
            const usr =
              this.bot.users.cache.get(user.user_id) || (await this.bot.users.fetch(user.user_id));
            const channel = guild.channels.cache.get(channel_id);

            if (!channel) {
              await this.bot.utils.updateUserById(user.user_id, user.guild_id, {
                reminder: {
                  hasReminder: !(user.reminder.reminders.length - 1 === 0),
                  reminders: user.reminder.reminders.filter((rem) => rem.shortId !== reminderId),
                },
              });
              return;
            }

            await this.bot.utils.updateUserById(user.user_id, user.guild_id, {
              reminder: {
                hasReminder: !(user.reminder.reminders.length - 1 === 0),
                reminders: user.reminder.reminders.filter((rem) => rem.shortId !== reminderId),
              },
            });

            const embed = this.bot.utils
              .baseEmbed({ author: usr })
              .setTitle("Reminder finished")
              .setDescription(`Your timer of **${time}** has ended`)
              .addField("Reminder message", msg);

            if (!channel.permissionsFor(guild.me!).has(DJS.Permissions.FLAGS.SEND_MESSAGES)) {
              return;
            }
            (channel as DJS.TextChannel).send({ content: `<@${user.user_id}>`, embeds: [embed] });
          });
      });
    }, this.TEN_SECOND_INTERVAL);
  }
}
