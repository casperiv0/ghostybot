const Logger = require("../modules/Logger");

module.exports = {
  name: "ready",
  execute(bot) {
    const serverCount = bot.formatNumber(bot.guilds.cache.size);
    const channelCount = bot.formatNumber(bot.channels.cache.size);
    const userCount = bot.formatNumber(bot.users.cache.size);
    const statuses = [
      ` ${serverCount} servers.`,
      `!help || ${channelCount} channels`,
      `${userCount} users`,
      "!help | https://ghostybot.tk",
    ];

    require("../helpers/unmuteHelper")(bot);
    require("../helpers/reminderHelper")(bot);
    require("../modules/features")(bot);


    Logger.log(
      "bot",
      `Bot is running with ${channelCount} channels, ${userCount} users and ${serverCount} servers`
    );
    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, { type: "WATCHING" });
    }, 60000);
  },
};
