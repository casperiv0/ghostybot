module.exports = {
  name: "ban",
  description: "ban",
  category: "admin",
  botPermissions: ["BAN_MEMBERS"],
  memberPermissions: ["BAN_MEMBERS"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const banMember = bot.findMember(message, args);
    let banReason = args.slice(1).join(" ");

    if (!banMember) {
      return message.channel.send(lang.MEMBER.NOT_FOUND);
    }
    if (!banReason) banReason = "Not Specified";

    if (!banMember.bannable || banMember.hasPermission("BAN_MEMBERS")) {
      return message.channel.send(lang.MEMBER.CANNOT_BE_BANNED);
    }

    if (message.guild.me.roles.highest.comparePositionTo(banMember.roles.highest) < 0) {
      return message.channel.send(
        lang.ROLES.MY_ROLE_MUST_BE_HIGHER.replace("{member}", banMember.tag)
      );
    }

    banMember.ban({
      days: 7,
      reason: `**${lang.ADMIN.BAN_BANNED_BY}:** ${message.author.tag}\n**${lang.GLOBAL.REASON}:** ${banReason}`,
    });

    try {
      banMember.user.send(
        lang.MEMBER.DM_BAN_MESSAGE.replace("{guild_name}", message.guild.name).replace(
          "{ban_reason}",
          banReason
        )
      );
      // eslint-disable-next-line no-empty
    } catch {}

    message.channel.send(
      lang.MEMBER.GUILD_BAN_MESSAGE.replace("{member}", banMember.user.username).replace(
        "{ban_reason}",
        banReason
      )
    );
  },
};
