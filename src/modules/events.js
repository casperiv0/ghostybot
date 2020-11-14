const { readdirSync } = require("fs");
// eslint-disable-next-line no-unused-vars
const Logger = require("./Logger");

module.exports = function loadEvents(bot) {
  const eventFiles = readdirSync("./src/events/").filter((file) =>
    file.endsWith(".js")
  );

  eventFiles.forEach((file) => {
    const event = require(`../events/${file}`);
    const isPlayer = file.startsWith("player.");

    if (!event.execute) {
      throw new TypeError(
        `[ERROR]: execute function is required for events! (${file})`
      );
    }

    if (!event.name) {
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);
    }

    if (isPlayer) {
      bot.player.on(event.name, event.execute.bind(null, bot));
    } else {
      bot.on(event.name, event.execute.bind(null, bot));
    }

    delete require.cache[require.resolve(`../events/${file}`)];

    // debug
    // Logger.log(
    //   "events",
    //   `Loaded ${isPlayer ? "Player:" : "Bot:"} ${event.name}`
    // );
  });
};
