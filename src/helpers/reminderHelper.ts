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

    const { updateUserById, baseEmbed } = bot.utils;

    setInterval(async () => {
      const reminders = await UserModel.find({ "reminder.hasReminder": true });
      if (!reminders) return;

      reminders.forEach((user: IUser) => {
        user.reminder.reminders
          .filter((r) => r.ends_at <= Date.now())
          .forEach(async (reminder: Reminder, idx: number) => {
            const guild = bot.guilds.cache.get(user.guild_id);
            if (!guild) return;

            const { channel_id, msg, time } = reminder;
            const usr = bot.users.cache.get(user.user_id) || (await bot.users.fetch(user.user_id));

            const channel = guild.channels.cache.get(channel_id);

            if (!channel) {
              updateUserById(user.user_id, user.guild_id, {
                reminder: {
                  hasReminder: user.reminder.reminders?.length - 1 >= 0,
                  reminders: user.reminder.reminders.filter((_, ix: number) => ix !== idx),
                },
              });
              return;
            }

            await updateUserById(user.user_id, user.guild_id, {
              reminder: {
                hasReminder: user.reminder.reminders?.length - 1 >= 0,
                reminders: user.reminder.reminders.filter((_, ix) => ix !== idx),
              },
            });

            const embed = baseEmbed({ author: usr })
              .setTitle("Reminder finished")
              .setDescription(`Your timer of **${time}** has ended`)
              .addField("Reminder message", msg);

            (channel as TextChannel).send(`<@${user.user_id}>`, embed);
          });
      });
    }, TEN_SECOND_INTERVAL);
  }
}
