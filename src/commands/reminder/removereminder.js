module.exports = {
  name: "removereminder",
  description: "Remove your current reminder",
  category: "reminder",
  aliases: ["delreminder"],
  async execute(bot, message) {
    const lang = await bot.getGuildLang(message.guild.id);

    const { user } = await bot.getUserById(message.author.id, message.guild.id);

    if (user?.reminder.on === false) {
      return message.channel.send(lang.REMINDER.NO_REMINDER_SET);
    }

    await bot.updateUserById(message.author.id, message.guild.id, {
      reminder: {
        ends_at: null,
        msg: null,
        channel_id: null,
        on: false,
        time: null,
      },
    });

    return message.channel.send(lang.REMINDER.REMOVE_SUCCESS);
  },
};
