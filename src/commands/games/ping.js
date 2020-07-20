module.exports = {
    name: "ping",
    description: "pong!",
    execute(bot, message, args) {
        message.channel.send("Ping!");
    },
};