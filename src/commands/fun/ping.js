module.exports = {
    name: "ping",
    description: "pong!",
    execute(message, args) {
        message.channel.send("Ping!");
    },
};