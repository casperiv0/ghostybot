const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "flipcoin",
    description: "Flip a coin",
    category: "games",
    execute(bot, message) {
        const replies = ["**You landed on Heads**", "**You landed on Tails**"];

        const reply = replies[Math.floor(Math.random() * replies.length)];

        const embed = new MessageEmbed()
            .setTitle("8Ball")
            .setTitle(`${reply}`)
            .setColor("BLUE")
            .setFooter(message.author.username)
            .setTimestamp();

        message.channel.send(embed);
    }
};