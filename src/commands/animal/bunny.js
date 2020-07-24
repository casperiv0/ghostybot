const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "bunny",
    description: "Shows a picture of a bunny",
    category: "animal",
    async execute(bot, message) {
        const data = await fetch("https://api.bunnies.io/v2/loop/random/?media=gif,png").then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.media.gif})`)
            .setImage(`${data.media.gif}`)
            .setTimestamp();

        message.channel.send(embed);
    }
};