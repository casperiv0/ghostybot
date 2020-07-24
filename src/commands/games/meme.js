const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "meme",
    description: "Returns a meme",
    category: "games",
    async execute(bot, message) {
        const data = await fetch("https://meme-api.herokuapp.com/gimme").then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setTitle(data.title)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.url})`)
            .setImage(`${data.url}`)
            .setTimestamp();

        message.channel.send(embed);
    }
};