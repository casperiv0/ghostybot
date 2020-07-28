const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "emojis",
    description: "Get a random color",
    category: "util",
    execute(bot, message) {
        const nonAnimated = [];
        const animated = [];

        message.guild.emojis.cache.forEach(e => {
            if (e.animated) animated.push(e.toString());
            else nonAnimated.push(e.toString());
        });

        const embed = new MessageEmbed()
            .addField("Animated:", animated.length === 0 ? "None" : animated.join(" "))
            .addField("Non Animated:", nonAnimated.length === 0 ? "None" : nonAnimated.join(" "))
            .setColor("BLUE")
            .setTimestamp()
            .setFooter(message.author.username);

        message.channel.send(embed);
    }
};