const { MessageEmbed } = require("discord.js");
const { reportsChannelId } = require("../../../config.json")

module.exports = {
    name: "bugreport",
    description: "Report a bug to your staff",
    execute(bot, message, args) {
        const bug = args.join(" ");

        if (!bug) return message.channel.send("Please provide a bug");



        const embed = new MessageEmbed()
            .setColor("BLUE")
            .setTitle(`${message.author.username} has reported a bug`)
            .setDescription(bug)
            .setFooter(message.author.username)
            .setTimestamp()

        bot.channels.cache.get(reportsChannelId).send(embed)

    }
}