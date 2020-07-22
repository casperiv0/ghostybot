const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "neko",
    description: "None",
    async execute(bot, message) {

        if (!message.channel.nsfw) return message.reply("This channel is not a NSFW channel!");

        const data = await fetch("https://nekobot.xyz/api/image?type=neko").then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setColor(data.color)
            .setDescription(`[Click here if the image failed to load.](${data.message})`)
            .setImage(`${data.message}`)
            .setTimestamp();

        message.channel.send(embed);
    }
};