const UserModel = require("../models/User.model");
const BaseEmbed = require("../modules/BaseEmbed");

module.exports = async (bot) => {
  const TEN_SECOND_INTERVAL = 10000;
  bot.logger.log("Helpers", "reminderHelper was initialized");

  setInterval(async () => {
    const reminders = await UserModel.find({ "reminder.on": true });
    if (!reminders) return;

    reminders
      .filter((u) => u.reminder?.ends_at <= Date.now())
      .forEach(async (user) => {
        const guild = bot.guilds.cache.get(user.guild_id);
        if (!guild) return;

        const { channel_id, msg, time } = user.reminder;
        const usr = bot.users.cache.get(user.user_id) || (await bot.users.fetch(user.user_id));

        const channel =
          guild.channels.cache.get(channel_id) || (await guild.channels.fetch(channel_id));

        if (!channel) {
          bot.updateUserById(user.user_id, user.guild_id, {
            reminder: {
              ends_at: null,
              msg: null,
              channel_id: null,
            },
          });
        }

        await bot.updateUserById(user.user_id, user.guild_id, {
          reminder: {
            on: false,
            msg: null,
            ends_at: null,
            channel_id: null,
            time: null,
          },
        });

        const embed = BaseEmbed({ author: usr })
          .setTitle("Reminder finished")
          .setDescription(`Your timer of **${time}** has ended`)
          .addField("Reminder message", msg);

        channel.send(`<@${user.user_id}>`, embed);
      });
  }, TEN_SECOND_INTERVAL);
};
