module.exports = {
    name: "sticky",
    description: "Sticky a message to the bottom of the screen",
    category: "admin",
    async execute(bot, message, args, serverQueue, queue, stickyData) {
        message.delete();

        const stickyMsg = args.join(" ");

        if (stickyMsg === "") return message.reply("Please provide a message");

        stickyData.channelId = message.channel.id;
        stickyData.id = message.id;
        stickyData.msg = `__***:warning: Sticky Message, Read Before Typing! :warning:***__ \n\n ${stickyMsg}`;

        const stickyMessage = await message.channel.send(stickyData.msg);
        stickyData.id = stickyMessage.id;
    }
};