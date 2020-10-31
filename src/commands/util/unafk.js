const Discord = require("discord.js")

module.exports = {
  name: "unafk",
  aliases: ["unafkme", "deleteafk"],
  category: "util",
  description: "",
  async execute(bot, message, args) {


let options = {

  justafk: false
}

bot.afk.delete(message.author.id, options)

message.channel.send({embed:{description:`You are now unafk!`, title: message.author.username, color: 0xff0000}})
  if(message.member.nickname) {
    if(message.member.nickname.includes('[AFK]')) {
    message.member.setNickname(` `)
    }
  } else {
    message.member.setNickname(`${message.author.username}`)
  }
    }

  }
