const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "kiss",
    description: "Shows a picture of people kissing",
    category: "games",
    async execute(bot, message) {
        const data = await fetch("https://nekos.life/api/kiss").then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.url})`)
            .setImage(`${data.url}`)
            .setTimestamp();

        message.channel.send(embed);
    }
};