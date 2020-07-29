const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "announce",
  description: "Announce something in a channel",
  usage: "announce <channel> <text>",
  category: "admin",
  execute(bot, message, args) {
    if (!message.member.hasPermission("MANAGE_MESSAGES"))
      return message.channel.send(
        "You don't have the correct permissions for that!"
      );

    const channel = message.mentions.channels.first();
    const text = args.splice(1).join(" ");

    if (!channel || !text)
      return message.channel.send("Please provide text or a valid channel");

    const embed = new MessageEmbed()
      .setTitle("📢 Announcement 📢")
      .setDescription(text)
      .setFooter(message.author.username)
      .setColor("BLUE");

    bot.channels.cache.get(channel.id).send(embed);
  },
};
