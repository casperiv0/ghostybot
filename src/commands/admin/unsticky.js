module.exports = {
    name: "unsticky",
    description: "Sticky a message to the bottom of the screen",
    aliases: ["removesticky"],
    category: "admin",
    execute(bot, message, args, serverQueue, queue, stickyData) {
        message.delete();
        stickyData.channelId = "";
        stickyData.id = "";
        stickyData.msg = "";

        message.channel.send(`Cleared sticky for ${message.channel.name}`);
    }
};