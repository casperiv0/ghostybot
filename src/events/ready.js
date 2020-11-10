module.exports = {
  name: "ready",
  execute(bot) {
    const serverCount = bot.guilds.cache.size;
    const channelCount = bot.channels.cache.size;
    const userCount = "+35000";
    const statuses = [
      ` ${serverCount} servers.`,
      `!help || ${channelCount} channels`,
      `${userCount} users`,
    ];

    console.log(
      `[BOT]: Bot is running with ${channelCount} channels, ${userCount} users and ${serverCount} servers`
    );
    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, { type: "WATCHING" });
    }, 60000);
  },
};
