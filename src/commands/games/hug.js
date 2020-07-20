const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "hug",
    description: "Shows a picture of people hugging",
    async execute(bot, message, args) {
        const data = await fetch('https://nekos.life/api/hug').then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.url})`)
            .setImage(`${data.url}`)
            .setTimestamp()

        message.channel.send(embed)
    }
}