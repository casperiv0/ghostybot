const { setStickyData } = require("../../utils/functions");

module.exports = {
    name: "unsticky",
    description: "Sticky a message to the bottom of the screen",
    aliases: ["removesticky"],
    category: "admin",
    execute(bot, message) {
        message.delete();

        const member = message.member;

        if (!member.hasPermission("MANAGE_MESSAGES"))
            return message.reply("You don't have the correct permission! (Manage messages)");

        setStickyData(message.guild.id, {});

        message.channel.send(`Cleared sticky for ${message.channel.name}`);
    }
};