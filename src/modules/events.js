// eslint-disable-next-line no-unused-vars
const Logger = require("./Logger");
const glob = require("glob");
const types = ["channel", "client", "guild", "message", "player", "sb"];

module.exports = function loadEvents(bot) {
  const eventFiles = glob.sync("./src/events/**/*.js");

  eventFiles.forEach((file) => {
    const event = require(`../../${file}`);
    let type = "Bot";

    types.forEach((t) => {
      if (file.includes(`${t}.`)) {
        type = t;
      }
    });

    if (!event.execute) {
      throw new TypeError(`[ERROR]: execute function is required for events! (${file})`);
    }

    if (!event.name) {
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);
    }

    switch (type) {
      case "player": {
        bot.player.on(event.name, event.execute.bind(null, bot));
        break;
      }
      case "sb": {
        bot.starboardsManager.on(event.name, event.execute.bind(null, bot));
        break;
      }
      default: {
        bot.on(event.name, event.execute.bind(null, bot));
      }
    }

    delete require.cache[require.resolve(`../../${file}`)];

    // debug
    // Logger.log("events", `Loaded ${bot.toCapitalize(type)}: ${event.name}`);
  });
};
