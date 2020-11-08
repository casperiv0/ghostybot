const { formatDate } = require("../../utils/functions");
const badges = require("../../data/badges.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "userinfo",
  description: "Get user info",
  usage: "!userinfo <user>",
  category: "util",
  aliases: ["whois", "user"],
  async execute(_bot, message, args) {
    const member =
      message.guild.members.cache.get(args.join(" ")) ||
      message.mentions.members.first() ||
      message.member;

    if (!member) {
      return message.channel.send("User wasn't found!");
    }

    const joinedAt = formatDate(member.joinedAt);
    const createdAt = formatDate(member.user.createdAt);
    const nickname = member.nickname || "None";
    const isBot = member.user.bot;
    const userFlags = (await member.user.fetchFlags())
      .toArray()
      .map((flag) => badges[flag])
      .join(" ");

    let statuses = {
      online: "🟢",
      idle: "🟠",
      dnd: "🔴",
    };

    const embedStatus = [];
    if (member.presence.status === "offline") embedStatus.push("⚫ Offline");
    if (member.presence.clientStatus.web) {
      embedStatus.push(`\n${statuses[member.presence.clientStatus.web]} Web`);
    }
    if (member.presence.clientStatus.mobile) {
      embedStatus.push(
        `\n${statuses[member.presence.clientStatus.mobile]} Mobile`
      );
    }
    if (member.presence.clientStatus.desktop) {
      embedStatus.push(
        `\n${statuses[member.presence.clientStatus.desktop]} Desktop`
      );
    }

    const roles =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
        .sort((a, b) => b.rawPosition - a.rawPosition)
        .map((r) => r)
        .join(", ") || "None";
    const roleCount = member.roles.cache.filter(
      (r) => r.id !== message.guild.id
    ).size;

    const { username, id, tag } = member.user;

    const embed = BaseEmbed(message)
      .addField("**Id**", id, true)
      .addField("**Username**", username, true)
      .addField("**Bot**", isBot, true)
      .addField("**Tag**", tag, true)
      .addField("**Badges**", userFlags.length > 0 ? userFlags : "None", true)
      .addField("**Created At**", createdAt, true)
      .addField("**Joined At**", joinedAt, true)
      .addField("**Server Nickname**", nickname, true)
      .addField("**Status**", embedStatus, true)
      .addField(`**Roles (${roleCount})**`, roles)
      .setTitle(`${username}'s info`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

    message.channel.send(embed);
  },
};
