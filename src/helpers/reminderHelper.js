const UserModel = require("../models/User.model");
const BaseEmbed = require("../modules/BaseEmbed");

/**
 * @param {import("discord.js").Client} bot
 */
module.exports = async (bot) => {
  const TEN_SECOND_INTERVAL = 10000;
  bot.logger.log("Helpers", "reminderHelper was initialized");

  setInterval(async () => {
    const reminders = await UserModel.find({ "reminder.hasReminder": true });
    if (!reminders) return;

    reminders.forEach((user) => {
      user.reminder.reminders
        .filter((r) => r.ends_at <= Date.now())
        .forEach(async (reminder, idx) => {
          const guild = bot.guilds.cache.get(user.guild_id);
          if (!guild) return;

          const { channel_id, msg, time } = reminder;
          const usr = bot.users.cache.get(user.user_id) || (await bot.users.fetch(user.user_id));

          const channel =
            guild.channels.cache.get(channel_id) || (await guild.channels.fetch(channel_id));

          if (!channel) {
            bot.updateUserById(user.user_id, user.guild_id, {
              reminder: {
                hasReminder: user.reminder.reminders?.length - 1 >= 0,
                reminders: user.reminder.reminders.filter((_, ix) => ix !== idx),
              },
            });
          }

          await bot.updateUserById(user.user_id, user.guild_id, {
            reminder: {
              hasReminder: user.reminder.reminders?.length - 1 >= 0,
              reminders: user.reminder.reminders.filter((_, ix) => ix !== idx),
            },
          });

          const embed = BaseEmbed({ author: usr })
            .setTitle("Reminder finished")
            .setDescription(`Your timer of **${time}** has ended`)
            .addField("Reminder message", msg);

          channel.send(`<@${user.user_id}>`, embed);
        });
    });
  }, TEN_SECOND_INTERVAL);
};
