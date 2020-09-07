module.exports = {
  name: "ready",
  execute(bot) {
    const userCount = bot.users.cache.filter((u) => !u.bot).size;
    const channelCount = bot.channels.cache.size;
    const interval = 1800000; /* 30 minutes */

    console.log(
      `[BOT]: Bot is running with ${channelCount} channels and ${userCount} users`
    );
    bot.user.setActivity(`${userCount} Users`, { type: "WATCHING" });

    setInterval(() => {
      bot.user.setActivity(`${userCount} Users`, {
        type: "WATCHING",
      });
    }, interval);
  },
};
