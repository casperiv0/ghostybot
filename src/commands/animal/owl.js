const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "owl",
    description: "Shows a picture of a owl",
    async execute(bot, message) {
        const data = await fetch("http://pics.floofybot.moe/owl").then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.image})`)
            .setImage(`${data.image}`)
            .setTimestamp();

        message.channel.send(embed);
    }
};