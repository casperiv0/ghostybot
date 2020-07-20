const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "dice",
    description: "Roll a dice",
    execute(bot, message, args) {
        const roll = Math.floor(Math.random() * 6) + 1;

        const embed = new MessageEmbed()
            .setTitle("8Ball")
            .setTitle("🎲 You landed on: " + roll)
            .setColor("BLUE")
            .setFooter(message.author.username)
            .setTimestamp()

        message.channel.send(embed)
    }
}