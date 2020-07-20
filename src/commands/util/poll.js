const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "poll",
    description: "Create a poll",
    async execute(bot, message, args) {
        const question = args.join(" ");

        if (!question) return message.reply("Please provide a poll");

        const embed = new MessageEmbed()
            .setTitle(question)
            .setDescription(`Poll created by ${message.author.tag}`)
            .setFooter(message.author.username)
            .setTimestamp()

        const sendMessage = await message.channel.send(embed);

        sendMessage.react("👍🏻")
        sendMessage.react("👎🏻")
        sendMessage.react("🤷🏻")
    }
}