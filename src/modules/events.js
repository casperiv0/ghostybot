const { readdirSync } = require("fs");

module.exports = function loadEvents(bot) {
  const eventFiles = readdirSync("./src/events/").filter((file) =>
    file.endsWith(".js")
  );

  eventFiles.forEach((file) => {
    const event = require(`../events/${file}`);

    if (!event.execute)
      throw new TypeError(
        `[ERROR]: execute function is required for events! (${file})`
      );

    if (!event.name)
      throw new TypeError(`[ERROR]: name is required for events! (${file})`);

    bot.on(event.name, event.execute.bind(null, bot));

    delete require.cache[require.resolve(`../events/${file}`)];

    // debug
    // console.log(`[INFO][EVENT]: Loaded ${event.name}`);
  });
};
