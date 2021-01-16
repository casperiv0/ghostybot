module.exports = {
  name: "unban",
  description: "unban a user by their id",
  category: "admin",
  botPermissions: ["BAN_MEMBERS"],
  memberPermissions: ["BAN_MEMBERS"],
  requiredArgs: ["member_id"],
  async execute(bot, message, args) {
    const lang = await bot.utils.getGuildLang(message.guild?.id);
    const userId = args[0];

    if (!userId) {
      return message.channel.send(lang.ADMIN.PROVIDE_VALID_USERID);
    }

    const bannedUser = await message.guild.members.unban(userId);

    message.channel.send(lang.ADMIN.SUC_UNBAN.replace("{bannedUsername}", bannedUser.username));
  },
};
