module.exports = {
  name: "removereminder",
  description: "Remove your current reminder",
  category: "reminder",
  aliases: ["delreminder"],
  requiredArgs: ["reminder_id"],
  async execute(bot, message, args) {
    const [id] = args;
    const lang = await bot.getGuildLang(message.guild.id);

    const { user } = await bot.getUserById(message.author.id, message.guild.id);

    if (user?.reminder.on === false) {
      return message.channel.send(lang.REMINDER.NO_REMINDER_SET);
    }

    await bot.updateUserById(message.author.id, message.guild.id, {
      reminder: {
        hasReminder: user.reminder.reminders?.length - 1 > 0,
        reminders: user.reminder.reminders.filter((reminder) => reminder.id !== id),
      },
    });

    return message.channel.send(lang.REMINDER.REMOVE_SUCCESS);
  },
};
