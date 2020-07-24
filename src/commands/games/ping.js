module.exports = {
    name: "ping",
    description: "pong!",
    category: "games",
    execute(bot, message) {
        message.channel.send("Pong!");
    },
};