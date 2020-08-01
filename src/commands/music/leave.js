module.exports = {
    name: "leave",
    description: "Let the bot disconnect",
    aliases: ["disconnect", "l"],
    category: "music",
    execute(bot, message, args, serverQueue) {
        if (!message.member.voice.channel) {
            return message.channel.send("You need to be in a voice channel!");
        }

        if (!serverQueue) {
            return message.channel.send("There are no songs currently playing");
        }

        serverQueue.songs = [];
        serverQueue.playing = false;
        serverQueue.connection.dispatcher?.end();
        serverQueue.voiceChannel.leave();
    }
};