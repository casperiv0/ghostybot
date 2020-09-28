const { MessageEmbed } = require("discord.js");
const { formatDate } = require("../../utils/functions");

module.exports = {
  name: "userinfo",
  description: "Get user info",
  usage: "!userinfo <user>",
  category: "util",
  aliases: ["whois", "user"],
  async execute(bot, message, args) {
    const member =
      message.guild.members.cache.get(args.join(" ")) ||
      message.mentions.members.first() ||
      message.member;

    if (!member) return message.channel.send("User wasn't found!");

    const joinedAt = formatDate(member.joinedAt);
    const createdAt = formatDate(member.user.createdAt);
    const nickname = member.nickname || "None";
    const isBot = member.user.bot;

    const roles =
      member.roles.cache
        .filter((r) => r.id !== message.guild.id)
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
      .addField("**Created At**", createdAt, true)
      .addField("**Joined At**", joinedAt, true)
      .addField("**Server Nickname**", nickname, true)
      .addField(`**Roles (${roleCount})**`, roles)
      .setTitle(`${username}'s info`)
      .setColor("BLUE")
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true}))
      .setTimestamp()
      .setFooter(message.author.username);

    message.channel.send(embed);
  },
};
