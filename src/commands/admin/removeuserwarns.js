const { getUserById, removeUserWarnings } = require("../../utils/functions");

module.exports = {
  name: "removeuserwarns",
  description: "Remove all warns from a user",
  category: "admin",
  requiredArgs: ["member"],
  async execute(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_GUILD")) {
      return message.channel.send(lang.ADMIN.NO_PERMISSIONS);
    }

    const guildId = message.guild.id;
    const member =
      message.guild.member(message.mentions.users.first()) ||
      message.guild.members.cache.get(args[1]);

    if (!member) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_USER);
    }

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    const { warnings } = await getUserById(member.user.id, guildId);

    if (warnings === null || !warnings[0]) {
      return message.channel.send(lang.ADMIN.NO_WARNINGS);
    }

    await removeUserWarnings(member.user.id, guildId);

    return message.channel.send(lang.ADMIN.REMOVED_ALL_WARNINGS);
  },
};
