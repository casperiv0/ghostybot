const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "iq",
    description: "Get a random Iq returned",
    category: "games",
    execute(bot, message) {
        const iq = Math.floor(Math.random() * 100) + 1;

        const embed = new MessageEmbed()
            .setTitle("8Ball")
            .setTitle(`You're IQ: ${iq}`)
            .setColor("BLUE")
            .setFooter(message.author.username)
            .setTimestamp();

        message.channel.send(embed);
    }
};