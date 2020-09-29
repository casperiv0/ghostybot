
module.exports = {
  name: "shutdown",
  description: "Shuts the bot down",
  category: "botowner",
  ownerOnly: true,
  async execute(bot, message) {

    await message.channel.send("Bot is shutting down...");
    process.exit(1);
  },
};
