const { MessageEmbed } = require("discord.js");
const { getModLog } = require("../../utils/functions");
module.exports = {
  name: "softban",
  description: "Soft Ban a User",
  category: "admin",
  async execute(bot, message, args) {
    if (!message.member.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "You do not have permission to perform this command!"
      );

    if (!message.guild.me.hasPermission("BAN_MEMBERS"))
      return message.channel.send(
        "I dont have permission to perform this command"
      );

    const banMember =
      message.mentions.members.first() ||
      message.guild.members.cache.get(args[0]);
    if (!banMember) {
      return message.channel.send("Please provide a user to ban!");
    }

    if (!banMember.bannable) {
      return message.channel.send("user cannot be banned!");
    }

    let reason = args.slice(1).join(" ");
    if (!reason) reason = "No reason provided";

    banMember
      .send({
        embed: {
          color: "BLUE",
          description: `Hello, you have been banned from **${message.guild.name}** for 1day. Reason: **${reason}**`,
        },
      })
      .then(() =>
        message.guild
          .member(banMember)
          .ban(banMember, { days: 1, reason: reason })
      )
      .then(() =>
        message.guild.members
          .unban(banMember.id)
          .catch((err) => console.log(err))
      );

    const modLog = await getModLog(message.guild.id);

    if (modLog !== null) {
      const modLogEmbed = new MessageEmbed()
        .setAuthor(`${message.guild.name} ModLogs`, message.guild.iconURL)
        .setThumbnail(banMember.user.displayAvatarURL())
        .addField("Moderation:", "Softban")
        .addField("Banned:", banMember.user.username)
        .addField("Moderator:", message.author.username)
        .addField("Reason:", reason)
        .setTimestamp();
      bot.channels.cache.get(modLog.id).send(modLogEmbed);
    }

    const embed = new MessageEmbed()
      .setColor("ORANGE")
      .setTitle(`Successfully softbanned ${banMember.user.username}`);
    message.channel.send(embed);
  },
};
