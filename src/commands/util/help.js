const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "help",
    description: "Shows all commands",
    execute(bot, message, args) {
        const commands = bot.commands

        const embed = new MessageEmbed()
            .addField("All Commands:", commands.map((cmd) => {
                return `\`${cmd.name}\``
            }))
            .setTimestamp()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setTitle("Help");

        message.channel.send(embed)
    }
}