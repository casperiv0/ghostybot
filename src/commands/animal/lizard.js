const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "lizard",
    description: "Shows a picture of a lizard",
    async execute(bot, message, args) {
        const data = await fetch('https://nekos.life/api/v2/img/lizard').then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.url})`)
            .setImage(`${data.url}`)
            .setTimestamp()

        message.channel.send(embed)
    }
}