const { MessageEmbed } = require("discord.js");
const answers = require("../../data/8ball.json");

module.exports = {
    name: "8ball",
    description: "8Ball",
    category: "games",
    execute(bot, message, args) {
        const question = args.join(" ");

        if (!question) return message.channel.send("Please provide a valid question");

        const answer = answers[Math.floor(Math.random() * answers.length)];

        const embed = new MessageEmbed()
            .setTitle("8Ball")
            .addField("Question:", question)
            .addField("Answer:", answer)
            .setColor("BLUE")
            .setFooter(message.author.username)
            .setTimestamp();

        message.channel.send(embed);
    }
};