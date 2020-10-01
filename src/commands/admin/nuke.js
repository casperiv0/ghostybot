const { MessageEmbed } = require("discord.js");
const { errorEmbed } = require("../../utils/functions");

module.exports = {
  name: "nuke",
  description: "Nuke a channel, delete all messages of the channel",
  usage: "nuke",
  aliases: ["channelnuke"],
  category: "admin",
  execute(bot, message) {
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        errorEmbed("manage channels! (Manage Channels)", message)
      );

    const user = message.member;
    if (!user.hasPermission("MANAGE_CHANNELS"))
      return message.channel.send(
        "You don't have the correct permissions for that!"
      );

    let channel = bot.channels.cache.get(message.channel.id)
var posisi = channel.position;
  
  
  channel.clone().then((channel2) => {
    channel2.setPosition(posisi)
    channel.delete()
    channel2.send("Channel has been nuked !",{
    files: ['https://media.tenor.com/images/0754697c9c4dd44ca8504dbf1b36b927/tenor.gif']
    })
  })
  },
};
