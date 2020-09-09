module.exports = {
  name: "ready",
  execute(bot) {
    const statuses = [
      ` ${bot.guilds.cache.size} servers.`,
      `!help || ${bot.channels.cache.size} channels`,
      `${bot.users.cache.size} users`,
    ]
    
    console.log(
      `[BOT]: Bot is running with ${bot.channels.cache.size} channels and ${bot.users.cache.size} users`
    );
    setInterval(() => {
    const status = statuses[Math.floor(Math.random() * statuses.length)]
    bot.user.setActivity(status, { type: "WATCHING"})
  }, 60000)
  },
};
