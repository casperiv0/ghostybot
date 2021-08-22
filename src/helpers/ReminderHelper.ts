import * as DJS from "discord.js";
import { Bot } from "structures/Bot";
import { Helper } from "structures/Helper";
import UserModel, { IUser, Reminder } from "models/User.model";

export default class ReminderHelper extends Helper {
  private TEN_SECOND_INTERVAL = 10_000;

  constructor(bot: Bot) {
    super(bot, "reminderHelper");
  }

  async execute() {
    setInterval(async () => {
      const reminders = await UserModel.find({ "reminder.hasReminder": true });
      if (!reminders) return;

      reminders.forEach((user: IUser) => {
        user.reminder.reminders
          .filter((r) => r.ends_at <= Date.now())
          .forEach(async (reminder: Reminder) => {
            const guild = this.bot.guilds.cache.get(user.guild_id);
            if (!guild) return;

            const { channel_id, msg, time, _id: reminderId } = reminder;
            const usr =
              this.bot.users.cache.get(user.user_id) || (await this.bot.users.fetch(user.user_id));
            const channel = guild.channels.cache.get(channel_id);

            if (!channel) {
              await this.bot.utils.updateUserById(user.user_id, user.guild_id, {
                reminder: {
                  hasReminder: !(user.reminder.reminders?.length - 1 === 0),
                  reminders: user.reminder.reminders.filter(
                    (rem: Reminder) => rem._id !== reminderId,
                  ),
                },
              });
              return;
            }

            await this.bot.utils.updateUserById(user.user_id, user.guild_id, {
              reminder: {
                hasReminder: !(user.reminder.reminders?.length - 1 === 0),
                reminders: user.reminder.reminders.filter(
                  (rem: Reminder) => rem._id !== reminderId,
                ),
              },
            });

            const embed = this.bot.utils
              .baseEmbed({ author: usr })
              .setTitle("Reminder finished")
              .setDescription(`Your timer of **${time}** has ended`)
              .addField("Reminder message", msg);

            if (!channel.permissionsFor(guild.me!)?.has(DJS.Permissions.FLAGS.SEND_MESSAGES)) {
              return;
            }
            (channel as DJS.TextChannel).send({ content: `<@${user.user_id}>`, embeds: [embed] });
          });
      });
    }, this.TEN_SECOND_INTERVAL);
  }
}
