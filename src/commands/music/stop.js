module.exports = {
    name: "stop",
    description: "stop",
    execute(bot, message, args, serverQueue, queue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You need to be in a voice channel!");
        }

        if (!serverQueue) {
            return message.channel.send("There are no songs to be stopped")
        }

        serverQueue.songs = [];
        serverQueue.playing = false;
        serverQueue.connection.dispatcher.destroy();
    }
}