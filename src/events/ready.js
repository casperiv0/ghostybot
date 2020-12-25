const Logger = require('../modules/Logger');
const loadFeatures = require('../features/load-features');

module.exports = {
  name: 'ready',
  execute(bot) {
    loadFeatures(bot);
    const serverCount = bot.guilds.cache.size;
    const channelCount = bot.channels.cache.size;
    const userCount = bot.users.cache.size;
    const statuses = [
      `${serverCount} servers.`,
      `${channelCount} channels`,
      `${userCount} users`,
      '!help',
    ];

    require('../helpers/unmuteHelper')(bot);
    require('../helpers/reminderHelper')(bot);

    let oneUser = 'users', oneServer = 'servers';

    if (userCount === 1) oneUser = 'user';
    if (serverCount === 1) oneServer = 'server';

    Logger.log(
      'bot',
      `Bot is running with ${channelCount} channels, ${userCount} ${oneUser} and ${serverCount} ${oneServer}`
    );
    setInterval(() => {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      bot.user.setActivity(status, { type: 'WATCHING' });
    }, 60000);
  },
};
