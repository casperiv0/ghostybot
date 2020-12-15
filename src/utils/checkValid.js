const config = require("../../config.json");
const Logger = require("../modules/Logger");

function checkValid() {
  const v = parseFloat(process.versions.node);

  if (v < 14) {
    throw Error("[ERROR]: This bot requires version 14 of nodejs! Please upgrade to version 14");
  }

  if (!config.token || config.token === "") {
    throw Error("[ERROR][BOT]: Bot token is required");
  }

  if (!config.mongodbUri || config.mongodbUri === "") {
    throw Error("[ERROR][BOT]: mongoUri is required");
  }

  if (!config.owners[0]) {
    Logger.warn("bot", "ownerId is required for bot-owner commands");
  }

  if (!config.reportsChannelId || config.reportsChannelId === "") {
    Logger.warn("bot", "reportsChannelId is required for the bugreport command");
  }

  if (!config.imdbKey || config.imdbKey === "") {
    Logger.warn("bot", "imdbKey is required for the imdb command");
  }

  if (!config.feedBackChannelId || config.feedBackChannelId === "") {
    Logger.warn("bot", "feedBackChannelId is required for the feedback command");
  }

  if (!config.openWeatherMapKey || config.openWeatherMapKey === "") {
    Logger.warn("bot", "openWeatherMapKey is required for the weather command");
  }

  if (!config.errorLogsChannelId || config.errorLogsChannelId === "") {
    Logger.warn(
      "bot",
      "errorLogsChannelId is required for reporting any errors (if none is provided, the bot will only log errors in the console)"
    );
  }

  if (!config.giphyApiKey || config.giphyApiKey === "") {
    Logger.warn("bot", "giphyApiKey is required for the giphy command");
  }

  if (config.dashboard.enabled === true) {
    const {
      clientId,
      clientSecret,
      jwtSecret,
      callbackUrl,
      dashboardUrl,
      discordApiUrl,
    } = config.dashboard;
    const msg = ". If you don't need the dashboard you can disable it in your config";

    const opts = [
      { name: "clientId", v: clientId },
      { name: "clientSecret", v: clientSecret },
      { name: "jwtSecret", v: jwtSecret },
      { name: "callbackUrl", v: callbackUrl },
      { name: "dashboardUrl", v: dashboardUrl },
      { name: "discordApiUrl", v: discordApiUrl },
    ];

    opts.forEach((opt) => {
      if (!opt.v || opt.v === "") {
        throw Error(`[ERROR][DASHBOARD]: "${opt.name}" is required for the dashboard ${msg}`);
      }
    });
  }
}

module.exports = checkValid;
