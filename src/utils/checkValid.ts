import { logger } from "utils/logger";
import chalk from "chalk";

interface EnvOptions {
  name: string;
  value: string | undefined;

  dashboard?: boolean;
  required?: boolean;
}

const ENV_OPTIONS: EnvOptions[] = [
  { name: "DISCORD_BOT_TOKEN", value: process.env["DISCORD_BOT_TOKEN"], required: true },
  { name: "MONGO_DB_URI", value: process.env["MONGO_DB_URI"], required: true },
  { name: "OWNERS", value: process.env["OWNERS"] },
  { name: "BUG_REPORTS_CHANNEL_ID", value: process.env["BUG_REPORTS_CHANNEL_ID"] },
  { name: "IMDB_KEY", value: process.env["IMDB_KEY"] },
  { name: "FEEDBACK_CHANNEL_ID", value: process.env["FEEDBACK_CHANNEL_ID"] },
  { name: "OPEN_WEATHER_MAP_API_KEY", value: process.env["OPEN_WEATHER_MAP_API_KEY"] },
  { name: "ERRORLOGS_CHANNEL_ID", value: process.env["ERRORLOGS_CHANNEL_ID"] },
  { name: "GIPHY_API_KEY", value: process.env["GIPHY_API_KEY"] },
  { name: "ALEXFLIPNOTE_API_KEY", value: process.env["ALEXFLIPNOTE_API_KEY"] },
  { name: "PASTE_CLIENT_KEY", value: process.env["PASTE_CLIENT_KEY"] },

  // dashboard stuff
  { name: "DISCORD_CLIENT_ID", value: process.env["DISCORD_CLIENT_ID"], dashboard: true },
  { name: "DISCORD_CLIENT_SECRET", value: process.env["DISCORD_CLIENT_SECRET"], dashboard: true },
  { name: "DASHBOARD_JWT_SECRET", value: process.env["DASHBOARD_JWT_SECRET"], dashboard: true },
  { name: "DASHBOARD_CALLBACK_URL", value: process.env["DASHBOARD_CALLBACK_URL"], dashboard: true },
  { name: "DASHBOARD_PORT", value: process.env["DASHBOARD_PORT"], dashboard: true },
  {
    name: "NEXT_PUBLIC_DASHBOARD_URL",
    value: process.env["NEXT_PUBLIC_DASHBOARD_URL"],
    dashboard: true,
  },
  {
    name: "NEXT_PUBLIC_DASHBOARD_BOTNAME",
    value: process.env["NEXT_PUBLIC_DASHBOARD_BOTNAME"],
    dashboard: true,
  },
  {
    name: "DASHBOARD_DISCORD_API_URL",
    value: process.env["DASHBOARD_DISCORD_API_URL"],
    dashboard: true,
  },
];

function checkValid() {
  const v = parseFloat(process.versions.node);

  if (v < 14) {
    throw Error("[ERROR]: This bot requires version 14 of nodejs! Please upgrade to version 14");
  }

  ENV_OPTIONS.filter((v) => !v.dashboard).forEach((option) => {
    if (!option.value) {
      const name = chalk.blue(option.name);

      return logger.warn(
        "ENV_OPTIONS",
        `env option: "${name}" was not provided in a .env file. This may be required for some commands.`,
      );
    }
  });

  if (process.env["DASHBOARD_ENABLED"] === "true") {
    const msg = ". If you don't need the dashboard you can disable it in your config";

    ENV_OPTIONS.filter((v) => v.dashboard).forEach((opt) => {
      if (!opt.value) {
        throw Error(`[ERROR][DASHBOARD]: "${opt.name}" is required for the dashboard ${msg}`);
      }
    });
  }
}

checkValid();
