const { MessageEmbed } = require("discord.js");
const randomColor = require("randomcolor");


module.exports = {
    name: "randomcolor",
    description: "Get a random color",
    category: "util",
    aliases: ["color"],
    execute(bot, message) {
        const color = randomColor();

        const embed = new MessageEmbed()
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor(color)
            .setTitle(color);

        message.channel.send(embed);
    }
};