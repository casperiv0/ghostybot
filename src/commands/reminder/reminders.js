const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "reminders",
  description: "All your active reminders",
  category: "reminder",
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = await bot.findMember(message, args, true);
    const { user } = await bot.getUserById(member.user.id, message.guild.id);

    if (!user.reminder.hasReminder) {
      return message.channel.send(lang.REMINDER.NO_ACTIVE_REM);
    }

    const mappedReminders = user.reminder.reminders.map((reminder) => {
      return `**${lang.REMINDER.MESSAGE}** ${reminder.msg}
**${lang.REMINDER.TIME}** ${reminder.time}
**${lang.MEMBER.ID}:** ${reminder.id}`;
    });

    const embed = BaseEmbed(message)
      .setTitle(lang.REMINDER.USER_REMINDERS.replace("{memberUsername}", member.user.username))
      .setDescription(mappedReminders.join("\n\n"));

    return message.channel.send(embed);
  },
};
