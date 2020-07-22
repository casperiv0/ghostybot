const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "rps",
    description: "Rock Paper Scissors",
    execute(bot, message) {
        const replies = ["Rock", "Paper", "Scissors"];

        const reply = replies[Math.floor(Math.random() * replies.length)];

        const embed = new MessageEmbed()
            .setTitle("Rock Paper Scissors")
            .setColor("BLUE")
            .setDescription(`**${reply}**`)
            .setFooter(message.author.username);

        message.channel.send(embed);
    },
};