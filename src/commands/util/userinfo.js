const { formatDate } = require("../../utils/functions");
const badges = require("../../data/badges.json");
const BaseEmbed = require("../../modules/BaseEmbed");

module.exports = {
  name: "userinfo",
  description: "Get user info",
  usage: "!userinfo <user>",
  category: "util",
  aliases: ["whois", "user"],
  async execute(bot, message, args) {
    const lang = await bot.getGuildLang(message.guild.id);
    const member = bot.findMember(message, args, true);

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
      .addField(`**${lang.MEMBER.ID}**`, id, true)
      .addField(`**${lang.MEMBER.USERNAME}**`, username, true)
      .addField(`**${lang.MEMBER.BOT}**`, isBot, true)
      .addField(`**${lang.MEMBER.TAG}**`, tag, true)
      .addField(
        `**${lang.MEMBER.BADGES}**`,
        userFlags.length > 0 ? userFlags : "None",
        true
      )
      .addField(`**${lang.MEMBER.CREATED_ON}**`, createdAt, true)
      .addField(`**${lang.MEMBER.JOINED_AT}**`, joinedAt, true)
      .addField(`**${lang.MEMBER.NICKNAME}**`, nickname, true)
      .addField(`**${lang.MEMBER.ROLES} (${roleCount})**`, roles)
      .setTitle(`${username}'s info`)
      .setThumbnail(member.user.displayAvatarURL({ dynamic: true }));

    message.channel.send(embed);
  },
};
