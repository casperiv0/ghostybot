const Discord = require('discord.js')
const { getModlog } = require("../../utils/functions")
module.exports = {
    name: "softban",
    description: "Soft Ban a User",
    category: "admin",
    async execute (bot, message, args) {
message.delete()

if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("You do not have permission to perform this command!")
if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I dont have permission to perform this command")

   let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) 
   if(!banMember) return message.channel.send("Please provide a user to ban!")

   let reason = args.slice(1).join(" ");
   if(!reason) reason = "No reason given!"

   

   banMember.send({embed: {color: "#ff0019", description:`Hello, you have been banned from ${message.guild.name} for: ${reason}`}}).then(() =>
   message.guild.member(banMember).ban(banMember, { days: 1, reason: reason})).then(() => message.guild.members.unban(banMember.id).catch(err => console.log(err)));

   const modlog = await getModlog(message.guild.id)

    let embed = new Discord.MessageEmbed()
    .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL)
    .setThumbnail(banMember.user.displayAvatarURL())
    .addField("Moderation:", "SOFT BAN")
    .addField("Banned:", banMember.user.username)
    .addField("Moderator:", message.author.username)
    .addField("Reason:", reason)
    .setTimestamp()
    bot.channels.cache.get(modlog.id).send(embed)
    let cheembed = new MessageEmbed()
    .setTitle(`succesfully softbanned ${banMember.user.username}`)
    message.channel.send(cheembed)
    }
}