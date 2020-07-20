const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "duck",
    description: "Shows a picture of a duck",
    async execute(bot, message, args) {
        const data = await fetch('https://random-d.uk/api/v1/random?type=gif').then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.url})`)
            .setImage(`${data.url}`)
            .setTimestamp()

        message.channel.send(embed)
    }
}