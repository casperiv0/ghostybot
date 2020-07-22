const { ownerId } = require("../../../config.json");

module.exports = {
    name: "shutdown",
    description: "Shuts the bot down",
    async execute(bot, message) {
        if (message.author.id !== ownerId) return message.reply("Only the owner is allowed to run this command");

        await message.channel.send("Bot is shutting down...");
        process.exit();
    }
};