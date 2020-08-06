const { MessageEmbed } = require("discord.js");

module.exports = {
    name: "nowplaying",
    description: "Shows info about the current playing song",
    category: "music",
    aliases: ["np", "now"],
    execute(bot, message, args, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You need to be in a voice channel!");
        }

        if (!serverQueue) {
            return message.channel.send("There are no songs currently playing");
        }

        const embed = new MessageEmbed()
            .setTitle("Now Playing")
            .setColor("BLUE")
            .setDescription(`${serverQueue.nowPlaying.title}`
            )
            .setImage(serverQueue.nowPlaying.thumbnail);
        message.channel.send(embed);
    }
};