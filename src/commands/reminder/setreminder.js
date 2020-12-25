const ms = require("ms");

module.exports = {
  name: "setreminder",
  description: "Set a reminder, the bot will ping you when the timer runs out",
  category: "reminder",
  requiredArgs: ["time", "message"],
  aliases: ["addreminder", "remind", "remindme"],
  usage: "setreminder <time> <message>",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const [time, ...rest] = args;
    const msg = rest.join(" ");

    const isValid = ms(time);
    if (!isValid) {
      return message.channel.send(lang.REMINDER.INVALID_DATE);
    }

    const { user } = await bot.getUserById(message.author.id, message.guild.id);
    const reminders = typeof user.reminder.reminders === "object" ? user.reminder.reminders : [];

    await bot.updateUserById(message.author.id, message.guild.id, {
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
          },
        ],
      },
    });

    return message.channel.send(lang.REMINDER.SUCCESS.replace("{time}", time));
  },
};
