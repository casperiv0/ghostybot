module.exports = {
    name: "resume",
    description: "Resume a song that was playing",
    aliases: ["r"],
    category: "music",
    execute(bot, message, args, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You need to be in a voice channel!");
        }

        if (!serverQueue) {
            return message.channel.send("There are no songs currently playing");
        }

        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
    }
};