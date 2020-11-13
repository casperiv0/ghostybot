const { MessageEmbed } = require("discord.js");
const { getGuildById } = require("../../utils/functions");

module.exports = {
  name: "announce",
  description: "Announce something in a channel",
  usage: "announce <channel> <text>",
  category: "admin",
  memberPermissions: ["MANAGE_MESSAGES"],
  async execute(bot, message, args) {
    message.delete();
    if (!args[0]) {
      return message.channel.send(
        "Please provide text or a valid channel!\n You can also set a default channel using `set announce-channel <channel mention>`"
      );
    }

    const guild = await getGuildById(message.guild.id);
    const announceChannel = guild.announcement_channel;
    let channel = message.mentions.channels.first();
    let text;

    if (channel) {
      text = args.splice(1).join(" ");
    } else if (announceChannel !== null) {
      channel = message.mentions.channels.first();
      text = args.join(" ");
    } else {
      return message.channel.send("Please provide text or a valid channel");
    }

    const embed = new MessageEmbed()
      .setTitle("📢 Announcement 📢")
      .setDescription(text)
      .setFooter(message.author.username)
      .setColor("BLUE");

    bot.channels.cache
      .get(announceChannel ? announceChannel : channel.id)
      .send(embed);
  },
};
