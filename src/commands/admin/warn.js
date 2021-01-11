const { getUserById, addWarning } = require("../../utils/functions");

module.exports = {
  name: "warn",
  description: "Warns a user",
  category: "admin",
  usage: "<user>",
  memberPermissions: ["MANAGE_GUILD"],
  requiredArgs: ["user"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = await bot.findMember(message, args);

    if (!member) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_MEMBER);
    }

    if (member.user.bot) {
      return message.channel.send(lang.MEMBER.BOT_DATA);
    }

    if (member.hasPermission("MANAGE_MESSAGES")) {
      return message.channel.send(lang.ADMIN.USER_NOT_WARN);
    }

    await addWarning(member.user.id, message.guild.id, reason);

    const { warnings } = await getUserById(member.user.id, message.guild.id);

    return message.channel.send(lang.ADMIN.USER_WARNED
      .replace("{memberTag}", member.user.tag)
      .replace("{reason}", reason)
      .replace("{warningsTotal}", warnings
        ? warnings.length 
        : "0"));
  },
};
