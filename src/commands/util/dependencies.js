const { MessageEmbed } = require("discord.js");
const pkg = require("../../../package.json");

module.exports = {
    name: "dependencies",
    description: "Shows a list of all bots dependencies",
    execute(bot, message, args) {
        const dependencies = Object.keys(pkg.dependencies).join(",\n");

        const embed = new MessageEmbed()
            .setTitle("All Dependencies")
            .setDescription(dependencies)
            .setTimestamp()
            .setFooter(message.author.username)

        message.channel.send(embed)
    }
}