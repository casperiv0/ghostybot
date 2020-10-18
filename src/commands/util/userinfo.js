const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../utils/functions");

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

    if (!member) return message.channel.send("User wasn't found!");

    const joinedAt = formatDate(member.joinedAt);
    const createdAt = formatDate(member.user.createdAt);
    const nickname = member.nickname || "None";
    const isBot = member.user.bot;
    const badges = (await member.user.fetchFlags())
      .toArray()
      .map((badges) => badges);
    const status = member.user.presence.status;
    let embedStatus;

    switch (status) {
      case "online":
        embedStatus = "🟢 Online";
        break;
      case "idle":
        embedStatus = "🟠 Idle";
        break;
      case "dnd":
        embedStatus = "🔴 Do not disturb";
        break;
      case "offline":
        embedStatus = "⚫ Offline";
        break;
      default:
        embedStatus = status;
        break;
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

    const embed = new MessageEmbed()
      .addField("**Id**", id, true)
      .addField("**Username**", username, true)
      .addField("**Bot**", isBot, true)
      .addField("**Tag**", tag, true)
      .addField("**Badges**", badges.length > 0 ? badges : "None", true)
      .addField("**Created At**", createdAt, true)
      .addField("**Joined At**", joinedAt, true)
      .addField("**Server Nickname**", nickname, true)
      .addField("**Status**", embedStatus, true)
      .addField(`**Roles (${roleCount})**`, roles)
      .setTitle(`${username}'s info`)
      .setColor("BLUE")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
      .setTimestamp()
      .setFooter(message.author.username);

    message.channel.send(embed);
  },
};
