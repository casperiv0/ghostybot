const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "reminders",
  description: "All your active reminders",
  category: "reminder",
  async execute(bot, message, args) {
    const member = bot.findMember(message, args, true);
    const { user } = await bot.getUserById(member.user.id, message.guild.id);

    if (!user.reminder.hasReminder) {
      return message.channel.send("user doesn't have any active reminders");
    }

    const mappedReminders = user.reminder.reminders.map((reminder) => {
      return `**Message:** ${reminder.msg}
**Time:** ${reminder.time}
**Id:** ${reminder.id}`;
    });

    const embed = BaseEmbed(message)
      .setTitle(`${member.user.username}'s active reminders`)
      .setDescription(mappedReminders.join("\n\n"));

    return message.channel.send(embed);
  },
};
