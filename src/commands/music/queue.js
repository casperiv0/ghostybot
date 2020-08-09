const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "queue",
    description: "Show top 20 songs in the queue",
    aliases: ["q"],
    category: "music",
    execute(bot, message, args, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You need to be in a voice channel!");
        }

        if (!serverQueue || serverQueue.songs.length <= 0) {
            return message.channel.send("There are no songs in the queue");
        }

        const embed = new MessageEmbed()
            .setTitle(`${message.guild.name}'s Music Queue`)
            .setColor("BLUE")
            .setDescription(serverQueue.songs.splice(0, 1024).map((song) => {
                return `- ${song.title}`;
            }));

        message.channel.send(embed);
    }
};