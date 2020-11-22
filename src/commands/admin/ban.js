module.exports = {
  name: "ban",
  description: "ban",
  category: "admin",
  botPermissions: ["BAN_MEMBERS"],
  memberPermissions: ["BAN_MEMBERS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const banUser = bot.findMember(message, args);
    let banReason = args.join(" ").slice(23);

    if (!banUser) {
      return message.channel.send(lang.MEMBER.NOT_FOUND);
    }
    if (!banReason) banReason = "Not Specified";

    if (!banUser.bannable || banUser.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(lang.MEMBER.CANNOT_BE_BANNED);
    }

    if (
      message.guild.me.roles.highest.comparePositionTo(banUser.roles.highest) <
      0
    ) {
      return message.channel.send(
        lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", banUser.tag)
      );
    }

    banUser.ban({
      days: 7,
      reason: `**Banned by:** ${message.author.tag}\n**Reason:** ${banReason}`,
    });

    banUser.user.send(
      lang.MEMBER.DM_BAN_MESSAGE.replace(
        "{guild_name}",
        message.guild.name
      ).replace("{ban_reason}", banReason)
    );
    message.channel.send(
      lang.MEMBER.GUILD_BAN_MESSAGE.replace(
        "{member}",
        banUser.user.username
      ).replace("{ban_reason}", banReason)
    );
  },
};
