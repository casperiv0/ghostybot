module.exports = {
    name: "ping",
    description: "pong!",
    execute(bot, message) {
        message.channel.send("Pong!");
    },
};