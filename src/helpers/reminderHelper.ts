import Bot from "../structures/Bot";
import Helper from "../structures/Helper";
import UserModel, { IUser, Reminder } from "../models/User.model";
import { TextChannel } from "discord.js";

export default class ReminderHelper extends Helper {
  constructor(bot: Bot) {
    super(bot, "reminderHelper");
  }

  async execute(bot: Bot) {
    const TEN_SECOND_INTERVAL = 10000;

    setInterval(async () => {
      const reminders = await UserModel.find({ "reminder.hasReminder": true });
      if (!reminders) return;

      reminders.forEach((user: IUser) => {
        user.reminder.reminders
          .filter((r) => r.ends_at <= Date.now())
          .forEach(async (reminder: Reminder) => {
            const guild = bot.guilds.cache.get(user.guild_id);
            if (!guild) return;

            const { channel_id, msg, time, _id: reminderId } = reminder;
            const usr = bot.users.cache.get(user.user_id) || (await bot.users.fetch(user.user_id));
            const channel = guild.channels.cache.get(channel_id);

            if (!channel) {
              bot.utils.updateUserById(user.user_id, user.guild_id, {
                reminder: {
                  hasReminder: !(user.reminder.reminders?.length - 1 === 0),
                  reminders: user.reminder.reminders.filter(
                    (rem: Reminder) => rem._id !== reminderId
                  ),
                },
              });
              return;
            }

            await bot.utils.updateUserById(user.user_id, user.guild_id, {
              reminder: {
                hasReminder: !(user.reminder.reminders?.length - 1 === 0),
                reminders: user.reminder.reminders.filter(
                  (rem: Reminder) => rem._id !== reminderId
                ),
              },
            });

            const embed = bot.utils
              .baseEmbed({ author: usr })
              .setTitle("Reminder finished")
              .setDescription(`Your timer of **${time}** has ended`)
              .addField("Reminder message", msg);

            if (!channel.permissionsFor(guild.me!)?.has("SEND_MESSAGES")) return;
            (channel as TextChannel).send(`<@${user.user_id}>`, embed);
          });
      });
    }, TEN_SECOND_INTERVAL);
  }
}
