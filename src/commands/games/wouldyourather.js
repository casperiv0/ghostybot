const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "wyr",
    description: "Would you rather",
    category: "games",
    execute(bot, message) {
        const replies = require("../../data/wouldYouRather.json");

        const reply = replies[Math.floor(Math.random() * replies.length)];

        const embed = new MessageEmbed()
            .setTitle("Would you rather?")
            .setColor("BLUE")
            .setDescription(`**${reply}**`)
            .setFooter(message.author.username);

        message.channel.send(embed);
    },
};