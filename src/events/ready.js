module.exports = {
  name: "ready",
  execute(bot) {
    console.log(
      `[BOT]: Bot is running with ${bot.channels.cache.size} channels and ${bot.users.cache.size} users`
    );
    bot.user.setActivity(`${bot.users.cache.size} Users`, { type: "WATCHING" });
  },
};
