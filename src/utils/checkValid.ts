import Logger from "handlers/Logger";

function checkValid() {
  const v = parseFloat(process.versions.node);

  if (v < 14) {
    throw Error("[ERROR]: This bot requires version 14 of nodejs! Please upgrade to version 14");
  }

  if (!process.env["DISCORD_BOT_TOKEN"]) {
    throw Error("[ERROR][BOT]: `DISCORD_BOT_TOKEN` is required");
  }

  if (!process.env["MONGO_DB_URI"]) {
    throw Error("[ERROR][BOT]: `MONGO_DB_URI` is required");
  }

  if (!process.env["OWNERS"]) {
    Logger.warn("bot", "`OWNERS` is required for bot-owner commands");
  }

  if (!process.env["BUG_REPORTS_CHANNEL_ID"]) {
    Logger.warn("bot", "`BUG_REPORTS_CHANNEL_ID` is required for the bugreport command");
  }

  if (!process.env["IMDB_KEY"]) {
    Logger.warn("bot", "`IMDB_KEY` is required for the imdb command");
  }

  if (!process.env["FEEDBACK_CHANNEL_ID"]) {
    Logger.warn("bot", "`FEEDBACK_CHANNEL_ID` is required for the feedback command");
  }

  if (!process.env["OPEN_WEATHER_MAP_API_KEY"]) {
    Logger.warn("bot", "`OPEN_WEATHER_MAP_API_KEY` is required for the weather command");
  }

  if (!process.env["ERRORLOGS_CHANNEL_ID"]) {
    Logger.warn(
      "bot",
      "`ERRORLOGS_CHANNEL_ID` is required for reporting any errors (if none is provided, the bot will only log errors in the console)",
    );
  }

  if (!process.env["GIPHY_API_KEY"]) {
    Logger.warn("bot", "`GIPHY_API_KEY` is required for the giphy command");
  }

  if (!process.env["ALEXFLIPNOTE_API_KEY"]) {
    Logger.warn("bot", "`ALEXFLIPNOTE_API_KEY` is required for the supreme command");
  }

  if (!process.env["PASTE_CLIENT_KEY"]) {
    Logger.warn("bot", "`PASTE_CLIENT_KEY` is required for the pastebin command");
  }

  if (process.env["DASHBOARD_ENABLED"] === "true") {
    const msg = ". If you don't need the dashboard you can disable it in your config";

    const opts = [
      { name: "DISCORD_CLIENT_ID", v: process.env["DISCORD_CLIENT_ID"] },
      { name: "DISCORD_CLIENT_SECRET", v: process.env["DISCORD_CLIENT_SECRET"] },
      { name: "DASHBOARD_JWT_SECRET", v: process.env["DASHBOARD_JWT_SECRET"] },
      { name: "DASHBOARD_CALLBACK_URL", v: process.env["DASHBOARD_CALLBACK_URL"] },
      { name: "DASHBOARD_PORT", v: process.env["DASHBOARD_PORT"] },
      { name: "NEXT_PUBLIC_DASHBOARD_URL", v: process.env["NEXT_PUBLIC_DASHBOARD_URL"] },
      { name: "NEXT_PUBLIC_DASHBOARD_BOTNAME", v: process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"] },
      { name: "DASHBOARD_DISCORD_API_URL", v: process.env["DASHBOARD_DISCORD_API_URL"] },
    ];

    opts.forEach((opt) => {
      if (!opt.v || opt.v === "") {
        throw Error(`[ERROR][DASHBOARD]: "${opt.name}" is required for the dashboard ${msg}`);
      }
    });
  }
}

checkValid();
