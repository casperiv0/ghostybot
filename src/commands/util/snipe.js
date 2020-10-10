const {MessageEmbed} = require('discord.js')
module.exports = {
name: 'snipe',
description: 'get deleted messages',
category: 'util',
 async execute (bot, message, args) {
     if(!message.member.hasPermission("MANAGE_MESSAGES"))
     return message.reply("You need manage messages permissions for this!")
 const msg = bot.snipes.get(message.channel.id);
 if(!msg) return message.channel.send("There isn't anything to snipe")
   
const embed = new MessageEmbed()
.setAuthor(msg.author.tag, msg.author.displayAvatarURL())
.setDescription(msg.content)
.setColor('ORANGE')
.setImage(msg.image)
message.channel.send(embed)
  }
}