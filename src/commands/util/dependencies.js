const { MessageEmbed } = require("discord.js");
const pkg = require("../../../package.json");

module.exports = {
    name: "dependencies",
    description: "Shows a list of all bots dependencies",
    category: "util",
    execute(bot, message) {
        const dependencies = Object.entries(pkg.dependencies).join(",\n");

        const embed = new MessageEmbed()
            .setTitle("All Dependencies")
            .setDescription(dependencies)
            .setTimestamp()
            .setFooter(message.author.username);

        message.channel.send(embed);
    }
};