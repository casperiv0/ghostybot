const { MessageEmbed } = require("discord.js");
const randomColor = require("randomcolor");


module.exports = {
    name: "randomcolor",
    description: "Get a random color",
    execute(bot, message, args) {
        const color = randomColor();

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor(color)
            .setTitle(color);

        message.channel.send(embed)
    }
}