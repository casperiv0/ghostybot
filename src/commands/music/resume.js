module.exports = {
    name: "resume",
    description: "Resume a song that was playing",
    execute(bot, message, args, serverQueue, queue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You need to be in a voice channel!");
        }

        if (!serverQueue) {
            return message.channel.send("There are no songs playing")
        }

        serverQueue.playing = true;
        serverQueue.connection.dispatcher.resume();
    }
}