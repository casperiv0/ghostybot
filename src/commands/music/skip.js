module.exports = {
    name: "skip",
    description: "Skip a song that is playing",
    aliases: ["s"],
    category: "music",
    execute(bot, message, args, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You need to be in a voice channel!");
        }

        if (!serverQueue) {
            return message.channel.send("There are no songs currently playing");
        }

        serverQueue.connection.dispatcher.end();
        message.react("👍");
    }
};
