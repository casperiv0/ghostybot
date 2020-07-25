const { MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

module.exports = {
    name: "panda",
    description: "Shows a picture of a panda",
    category: "animal",
    async execute(bot, message) {
        const data = await fetch("https://some-random-api.ml/img/panda").then(res => res.json());

        const embed = new MessageEmbed()
            .setFooter(message.author.username)
            .setColor("BLUE")
            .setDescription(`[Click here if the image failed to load.](${data.link})`)
            .setImage(`${data.link}`)
            .setTimestamp();

        message.channel.send(embed);
    }
};