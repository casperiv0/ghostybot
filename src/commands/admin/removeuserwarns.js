const { removeUserWarnings } = require("../../utils/functions");

module.exports = {
  name: "removeuserwarns",
  description: "Remove all warns from a user",
  category: "admin",
  memberPermissions: ["MANAGE_GUILD"],
  requiredArgs: ["member"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const member = await bot.utils.findMember(message, args);

    const guildId = message.guild?.id;

    if (!member) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_USER);
    }

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    const { warnings } = await bot.utils.getUserById(member.user.id, guildId);

    if (warnings === null || !warnings[0]) {
      return message.channel.send(lang.ADMIN.NO_WARNINGS);
    }

    await removeUserWarnings(member.user.id, guildId);

    return message.channel.send(lang.ADMIN.REMOVED_ALL_WARNINGS);
  },
};
