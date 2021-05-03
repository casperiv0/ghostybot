import P from "bluebird";
import "dotenv/config";

P.Promise.config({
  longStackTraces: true,
  warnings: true,
});

import "./utils/checkValid";
require("./utils/database");
import logs from "discord-logs";
import Bot from "./structures/Bot";

const bot = new Bot();
logs(bot);

if (process.env["DASHBOARD_ENABLED"] === "true") {
  import("./server").then((v) => v.default(bot));
}

if (process.env["DEBUG_MODE"] === "true") {
  bot.on("debug", console.log);
}

bot.login(process.env["DISCORD_BOT_TOKEN"]);

// Unhandled errors
process.on("unhandledRejection", (error: Error) => bot.utils.sendErrorLog(error, "error"));

process.on("uncaughtExceptionMonitor", (error) => bot.utils.sendErrorLog(error, "error"));

process.on("warning", (warning) => {
  bot.utils.sendErrorLog(warning, "warning");
});
