const fetch = require("node-fetch");
const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "dadjoke",
    description: "Shows a dadjoke",
    async execute(bot, message, args) {
        const data = await fetch(`https://icanhazdadjoke.com/slack`).then(res => res.json());

        message.channel.send(data.attachments[0].fallback)
    }
}