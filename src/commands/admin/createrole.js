const Discord = require('discord.js')
const {MessageEmbed} = require('discord.js')
module.exports = {
name: "addrole",
description: "This command creates a role with the name of what you say",
category: "admin", 
  async execute(client,message,args){
    const XD = new Discord.MessageEmbed()
    .setDescription('You do not have permission to use this command!')
    .setColor("RANDOM");
    if (!message.member.hasPermission("MANAGE_ROLES")){
      return message.channel.send(XD)
    };
    const rolename = args.slice(0).join(" ");
      
    const embed = new Discord.MessageEmbed()
    .setTitle('Please Specify')
    .setDescription("Please specify what you want to name the role!")
    .setColor("RANDOM");
      
    const UwU = new Discord.MessageEmbed()
.setDescription('I don\'t have permission to do that command!')
.setColor("RANDOM");
    if(message.guild.me.hasPermission('MANAGE_ROLES')){
        
    if (!rolename) {message.channel.send(embed)};
        
    if (rolename){
    message.guild.roles.create({
      data: {
      name: rolename,
      color: "BLUE"
      }
    })
    const embed = new Discord.MessageEmbed()
    .setTitle(`Created Role: ${rolename}`)
    .setDescription(`Successfully created the \`${rolename}\` role`)
    .setColor("RANDOM")
    .setTimestamp();
    message.channel.send(embed)
    };
    } else return message.channel.send(UwU)
    }
}
